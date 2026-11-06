from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: deep piercing line at a tested support, entry on the high break ─────────────
P = 0.0001
b = Builder(start=1.0920, pip=P, seed=231)
b.walk([-18, -22, -15, -20])                                      # 0-3 decline
support = round(min(k["l"] for k in b.candles) - 3 * P, 4)
o = b.last
b.add(o=o, h=o + 6 * P, l=support, c=support + 14 * P)            # 4 first touch
b.walk([25, 22, -8, 28, 20])                                      # 5-9 bounce
swing_high = round(max(k["h"] for k in b.candles[5:10]), 5)
b.walk([-20, -24, -18, -16])                                      # 10-13 back down
o = b.last
b.add(o=o, h=o + 4 * P, l=min(o, support + 30 * P) - 2 * P, c=support + 30 * P)  # 14 near support
o = b.last
b.add(o=o, h=o + 2 * P, l=support + 1 * P, c=support + 3 * P)      # 15 long bearish candle 1 (body 27)
c1 = b.candles[-1]
body1 = c1["o"] - c1["c"]
c2c = round(c1["c"] + 0.75 * body1, 5)                             # closes 75% into candle 1's body
pl_idx = b.add(o=c1["c"], h=c2c + 1 * P, l=support - 6 * P, c=c2c)  # 16 PIERCING candle
pl = b.candles[pl_idx]
entry = round(pl["h"] + 1 * P, 5)
stop = round(min(pl["l"], c1["l"]) - 3 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
b.add(o=pl["c"], h=entry + 6 * P, l=pl["c"] - 2 * P, c=entry + 4 * P)   # 17 breaks the piercing high
b.walk([18, -6, 22, 16, -8, 20, 14, 12], wick=(0.15, 0.4))             # 18-25 rally
print("piercing", c1, pl, "support", support, "entry", entry, "stop", stop, "target", target,
      "swing", swing_high, "room R", round((swing_high - entry) / (entry - stop), 2))

meta = base_meta(
    "piercing-line-win-01",
    {"en": "Deep Piercing Line at Tested Support, High Break Entry", "bn": "পরীক্ষিত support-এ গভীর piercing line, high ভাঙলে entry"},
    "EURUSD", "H1", "bullish", "win",
    ["piercing-line", "candlestick", "support", "pattern"],
    {"en": "Illustrative synthetic EURUSD H1: at a support that held once, a long bearish candle is followed by a green candle that dips below support and closes about three quarters of the way back into the red body. The next candle breaks the piercing candle's high; price rallies to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক EURUSD H1: আগে একবার ধরে রাখা support-এ একটি লম্বা bearish candle, তারপর একটি সবুজ candle support-এর নিচে নেমে লাল body-র প্রায় তিন-চতুর্থাংশ পর্যন্ত ফিরে close করে। পরের candle piercing candle-এর high ভাঙে; দাম 2R পর্যন্ত যায়।"},
    {"en": "Candle 4 marks support. Candle 15 is a long bearish candle into it. Candle 16 opens at that close, dips under support, and closes about 75% back into candle 15's body, but below its open: a piercing line. Candle 17 breaks the piercing candle's high and fills the buy stop; the stop sits below the pattern low.",
     "bn": "৪ নম্বর candle support চিহ্নিত করে। ১৫ নম্বর সেখানে একটি লম্বা bearish candle। ১৬ নম্বর তার close-এ open করে, support-এর নিচে নামে, তারপর ১৫ নম্বরের body-র প্রায় 75% পর্যন্ত ফিরে close করে, কিন্তু তার open-এর নিচে: piercing line। ১৭ নম্বর piercing candle-এর high ভেঙে buy stop fill করে; stop pattern-এর low-এর নিচে।"},
    [
        hline(support, "Support", BLUE),
        marker(4, "1st touch"),
        marker(16, "Piercing line"),
        hline(entry, "Entry (high break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "The deeper the green close into the red body, the stronger the signal", "bn": "সবুজ close লাল body-র যত গভীরে, signal তত শক্ত"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=17, expect="win"))

# ───────────── FAIL: barely-50% piercing line inside strong selling momentum ─────────────
P = 0.0001
b = Builder(start=1.2850, pip=P, seed=239)
b.walk([-40, -55, -35, -60, -50], wick=(0.1, 0.3))                 # 0-4 strong momentum drop
o = b.last
b.add(o=o, h=o + 5 * P, l=o - 72 * P, c=o - 70 * P)                 # 5 long bearish candle 1 (body 70)
c1 = b.candles[-1]
body1 = c1["o"] - c1["c"]
c2c = round(c1["c"] + 0.52 * body1, 5)                              # barely past the midpoint
pl_idx = b.add(o=c1["c"], h=c2c + 3 * P, l=c1["c"] - 12 * P, c=c2c)  # 6 shallow piercing candle
pl = b.candles[pl_idx]
entry = pl["c"]                                                     # close entry
stop = round(min(pl["l"], c1["l"]) - 6 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
b.add(o=pl["c"], h=pl["c"] + 6 * P, l=pl["c"] - 30 * P, c=pl["c"] - 26 * P)   # 7 sellers return
b.walk([-35, -40, 10, -45], wick=(0.15, 0.4))                                 # 8-11 drop continues
print("piercing", c1, pl, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "piercing-line-fail-01",
    {"en": "Shallow Piercing Line Inside Strong Selling Momentum", "bn": "শক্তিশালী selling momentum-এর ভেতরে অগভীর piercing line"},
    "GBPUSD", "D1", "bullish", "loss",
    ["piercing-line", "candlestick", "fail", "momentum", "pattern"],
    {"en": "Illustrative synthetic GBPUSD D1: after five large bearish days with no support nearby, a green candle closes just past the middle of the prior red body. Bought at the close, the trade fails as the selling resumes.",
     "bn": "শিক্ষামূলক কাল্পনিক GBPUSD D1: কাছে কোনো support নেই, টানা পাঁচটি বড় bearish দিনের পর একটি সবুজ candle আগের লাল body-র মাঝের সামান্য উপরে close করে। Close-এ buy, selling আবার শুরু হলে stop।"},
    {"en": "Candles 0-5 are large bearish candles: strong selling momentum. Candle 6 technically qualifies as a piercing line, but it closes only about 52% into candle 5's body, and there is no support beneath. Candle 7 turns down and the drop runs through the stop.",
     "bn": "০-৫ নম্বর বড় bearish candle: শক্তিশালী selling momentum। ৬ নম্বর নিয়মমতো piercing line, কিন্তু ৫ নম্বরের body-র মাত্র প্রায় 52% পর্যন্ত close করে, আর নিচে কোনো support নেই। ৭ নম্বর নিচে ঘোরে, পতন stop ভেঙে এগোয়।"},
    [
        marker(5, "Long red candle", below=False),
        marker(6, "Shallow piercing"),
        hline(entry, "Entry (close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A barely-50% piercing line against strong momentum is mostly a pause", "bn": "শক্তিশালী momentum-এর বিপরীতে সবে-50% piercing line মূলত বিরতি"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=6, expect="loss"))
