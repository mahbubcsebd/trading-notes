from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: tweezer bottom on a tested support, long on the high break ─────────────
D = 1.0
b = Builder(start=2420.0, pip=D, seed=311, decimals=2)
b.walk([-9, -12, -7, -10])                                        # 0-3 decline
support = round(min(k["l"] for k in b.candles) - 2, 2)
o = b.last
b.add(o=o, h=o + 3, l=support, c=support + 8)                     # 4 first touch
b.walk([12, 10, -4, 14, 9])                                       # 5-9 bounce
swing_high = round(max(k["h"] for k in b.candles[5:10]), 2)
b.walk([-10, -12, -9])                                            # 10-12 back down
o = b.last
b.add(o=o, h=o + 2, l=support + 3, c=support + 6)                  # 13 into support
o = b.last
low = round(support - 1.5, 2)
b.add(o=o, h=o + 1.5, l=low, c=low + 1.2)                          # 14 TWEEZER candle A: bearish to the low
ta = b.candles[-1]
tb_c = round(ta["o"] + 3.5, 2)
b.add(o=ta["c"], h=tb_c + 1, l=low + 0.2, c=tb_c)                  # 15 TWEEZER candle B: same low, bullish close
tb = b.candles[-1]
entry = round(tb["h"] + 0.5, 2)
stop = round(min(ta["l"], tb["l"]) - 2.5, 2)
target = round(entry + 2 * (entry - stop), 2)
b.add(o=tb["c"], h=entry + 4, l=tb["c"] - 1, c=entry + 3)          # 16 breaks the tweezer high
b.walk([8, -3, 10, 7, -4, 9, 6], wick=(0.15, 0.4))                 # 17-23 rally
print("tweezer", ta, tb, "support", support, "entry", entry, "stop", stop, "target", target,
      "swing", swing_high, "room R", round((swing_high - entry) / (entry - stop), 2))

meta = base_meta(
    "tweezer-bottom-win-01",
    {"en": "Tweezer Bottom on Tested Support, High Break Entry", "bn": "পরীক্ষিত support-এ tweezer bottom, high ভাঙলে entry"},
    "XAUUSD", "H4", "bullish", "win",
    ["tweezer-bottom", "tweezer", "candlestick", "support", "pattern"],
    {"en": "Illustrative synthetic XAUUSD H4: price returns to a support that held once. A bearish candle and the next bullish candle print matching lows just under the level; the second closes above the first one's open. A buy stop above the pair fills and price rallies to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক XAUUSD H4: দাম আগে একবার ধরে রাখা support-এ ফেরে। একটি bearish candle আর পরের bullish candle level-এর সামান্য নিচে একই low দেয়; দ্বিতীয়টা প্রথমটার open-এর উপরে close করে। জোড়ার উপরে buy stop fill হয়, দাম 2R পর্যন্ত ওঠে।"},
    {"en": "Candle 4 marks support. Candles 10-13 fall back to it. Candle 14 drops to a low just under support; candle 15 tests the same low within 20 cents and closes above candle 14's open. Two candles rejected the same price: a tweezer bottom. Candle 16 breaks the high and fills the buy stop; the stop sits under the shared low.",
     "bn": "৪ নম্বর candle support চিহ্নিত করে। ১০-১৩ নম্বর আবার সেখানে নামে। ১৪ নম্বর support-এর সামান্য নিচে একটি low দেয়; ১৫ নম্বর 20 সেন্টের মধ্যে একই low পরীক্ষা করে ১৪ নম্বরের open-এর উপরে close করে। দুটি candle একই দাম প্রত্যাখ্যান করেছে: tweezer bottom। ১৬ নম্বর high ভেঙে buy stop fill করে; stop যৌথ low-এর নিচে।"},
    [
        hline(support, "Support", BLUE),
        hline(low, "Matching lows", BLUE, style="dotted"),
        marker(14, "Tweezer A"),
        marker(15, "Tweezer B"),
        hline(entry, "Entry (high break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Two candles rejecting the same price at a level is the signal", "bn": "Level-এ দুটি candle-এর একই দাম প্রত্যাখ্যানই signal"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=16, expect="win"))

# ───────────── FAIL: equal lows mid-downtrend become a liquidity pool and get swept ─────────────
P = 0.0001
b = Builder(start=1.2750, pip=P, seed=317)
b.walk([-18, 6, -20, -15, 5, -22, -16], wick=(0.15, 0.4))         # 0-6 downtrend
o = b.last
low = round(o - 14 * P, 5)
b.add(o=o, h=o + 3 * P, l=low, c=low + 3 * P)                       # 7 TWEEZER A
ta = b.candles[-1]
b.add(o=ta["c"], h=ta["o"] + 4 * P, l=low + 1 * P, c=ta["o"] + 2 * P)   # 8 TWEEZER B: matching low, bullish
tb = b.candles[-1]
entry = round(tb["h"] + 2 * P, 5)
stop = round(low - 5 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
b.add(o=tb["c"], h=entry + 4 * P, l=tb["c"] - 3 * P, c=entry + 1 * P)  # 9 fills
c = b.last
b.add(o=c, h=c + 2 * P, l=c - 16 * P, c=c - 14 * P)                    # 10 turns down
c = b.last
b.add(o=c, h=c + 2 * P, l=low - 12 * P, c=low - 8 * P)                 # 11 sweeps the equal lows, takes the stop
b.walk([-20, -14, 5, -18], wick=(0.15, 0.4))                           # 12-15 downtrend continues
print("tweezer", ta, tb, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "tweezer-bottom-fail-01",
    {"en": "Tweezer Bottom Mid-Downtrend Gets Swept", "bn": "Downtrend-এর মাঝে tweezer bottom, পরে sweep"},
    "GBPUSD", "H1", "bullish", "loss",
    ["tweezer-bottom", "tweezer", "candlestick", "fail", "liquidity", "pattern"],
    {"en": "Illustrative synthetic GBPUSD H1: in a steady downtrend with no support, two candles print matching lows. Bought on the high break, the trade fails when price sweeps below the equal lows, where stops were resting, and keeps falling.",
     "bn": "শিক্ষামূলক কাল্পনিক GBPUSD H1: কোনো support ছাড়া একটানা downtrend-এ দুটি candle একই low দেয়। High ভাঙলে buy, কিন্তু দাম সমান low-গুলোর নিচে, যেখানে stop জমা ছিল, sweep করে নামতে থাকে।"},
    {"en": "Candles 0-6 are a steady downtrend. Candles 7 and 8 print matching lows, but no marked support lies there. Buyers enter on the break of candle 8's high. Equal lows are where many stops sit; candle 11 runs below them, takes the stop and the downtrend continues.",
     "bn": "০-৬ নম্বর candle একটানা downtrend। ৭ ও ৮ নম্বর একই low দেয়, কিন্তু সেখানে কোনো চিহ্নিত support নেই। ৮ নম্বরের high ভাঙলে buyers ঢোকে। সমান low-এর নিচে অনেকের stop থাকে; ১১ নম্বর তার নিচে নেমে stop নেয়, downtrend চলতে থাকে।"},
    [
        hline(low, "Equal lows (stops below)", BLUE, style="dotted"),
        marker(7, "Tweezer A"),
        marker(8, "Tweezer B"),
        marker(11, "Sweep", below=False),
        hline(entry, "Entry (high break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Equal lows without a real level are a magnet for stops, not support", "bn": "আসল level ছাড়া সমান low stop-এর চুম্বক, support নয়"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=9, expect="loss"))
