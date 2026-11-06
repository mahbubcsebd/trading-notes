from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: inside bar in an uptrend, buy the break of the inside bar high ─────────────
P = 0.0001
b = Builder(start=1.2500, pip=P, seed=351)
b.walk([40, 30, -15, 45, 35, -20, 40])                            # 0-6 uptrend
o = b.last
b.add(o=o, h=o + 72 * P, l=o - 6 * P, c=o + 66 * P)               # 7 MOTHER bar: strong bullish
mo = b.candles[-1]
ib_h, ib_l = round(mo["h"] - 14 * P, 5), round(mo["l"] + 34 * P, 5)
b.add(o=mo["c"], h=ib_h, l=ib_l, c=round(ib_l + 20 * P, 5))       # 8 INSIDE BAR
ib = b.candles[-1]
assert ib["h"] < mo["h"] and ib["l"] > mo["l"]
entry = round(ib["h"] + 3 * P, 5)
stop = round(ib["l"] - 6 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
b.add(o=ib["c"], h=entry + 22 * P, l=ib["c"] - 4 * P, c=entry + 18 * P)   # 9 breaks the inside bar high
b.walk([35, -12, 40, 30, -10, 38], wick=(0.15, 0.4))                     # 10-15 trend continues
print("mother", mo, "inside", ib, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "inside-bar-win-01",
    {"en": "Inside Bar in an Uptrend, Break of the Inside Bar High", "bn": "Uptrend-এ inside bar, inside bar-এর high ভাঙলে entry"},
    "GBPUSD", "D1", "bullish", "win",
    ["inside-bar", "price-action", "continuation", "trend", "pattern"],
    {"en": "Illustrative synthetic GBPUSD D1: in a steady uptrend, a strong bullish mother bar is followed by a smaller bar entirely inside its range. The next day breaks the inside bar's high, filling a buy stop in the trend direction; price reaches 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক GBPUSD D1: একটানা uptrend-এ একটি শক্তিশালী bullish mother bar, তারপর একটি ছোট bar পুরোটা তার range-এর ভেতরে। পরের দিন inside bar-এর high ভাঙে, trend-এর দিকে buy stop fill হয়; দাম 2R পর্যন্ত যায়।"},
    {"en": "Candles 0-6 are an uptrend. Candle 7 is a large bullish mother bar. Candle 8's high and low both sit inside candle 7's range: an inside bar, a pause after the push. Candle 9 breaks the inside bar high and fills the buy stop; the stop sits below the inside bar low.",
     "bn": "০-৬ নম্বর candle uptrend। ৭ নম্বর বড় bullish mother bar। ৮ নম্বরের high আর low দুটোই ৭ নম্বরের range-এর ভেতরে: inside bar, ধাক্কার পরের বিরতি। ৯ নম্বর inside bar-এর high ভেঙে buy stop fill করে; stop inside bar-এর low-এর নিচে।"},
    [
        marker(7, "Mother bar"),
        marker(8, "Inside bar", below=False),
        hline(mo["h"], "Mother high", BLUE, style="dotted"),
        hline(mo["l"], "Mother low", BLUE, style="dotted"),
        hline(entry, "Entry (IB high break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "An inside bar in a trend is a pause; trade the break in the trend direction", "bn": "Trend-এ inside bar একটি বিরতি; trend-এর দিকের break-এ trade"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=9, expect="win"))

# ───────────── FAIL: inside bar at resistance, false break up (fakey), then down ─────────────
D = 1.0
b = Builder(start=2380.0, pip=D, seed=353, decimals=2)
b.walk([5, 6, -2, 7, 4])                                          # 0-4 rally
res = round(max(k["h"] for k in b.candles) + 1, 2)
o = b.last
b.add(o=o, h=res, l=o - 3, c=res - 6)                             # 5 old high
b.walk([-6, -7, 3, -5])                                           # 6-9 pullback
b.walk([4, 3])                                                    # 10-11 rally back
o = b.last
b.add(o=o, h=res - 1, l=o - 1, c=res - 2.5)                        # 12 MOTHER bar into the old high
mo = b.candles[-1]
ib_h, ib_l = round(mo["h"] - 1.5, 2), round(mo["c"] - 5, 2)
b.add(o=mo["c"], h=ib_h, l=ib_l, c=round(ib_l + 2, 2))             # 13 INSIDE BAR
ib = b.candles[-1]
assert ib["h"] < mo["h"] and ib["l"] > mo["l"]
entry = round(ib["h"] + 0.5, 2)
stop = round(ib["l"] - 1.5, 2)
target = round(entry + 2 * (entry - stop), 2)
b.add(o=ib["c"], h=res + 2.5, l=ib["c"] - 1, c=ib["c"] - 0.5)       # 14 false break above, closes back inside
c = b.last
b.add(o=c, h=c + 1, l=stop - 3, c=stop - 2)                         # 15 breaks the inside bar low: stop
b.walk([-6, -5, 2, -7], wick=(0.15, 0.4))                           # 16-19 decline (the fakey works the other way)
print("mother", mo, "inside", ib, "entry", entry, "stop", stop, "target", target, "res", res)

meta = base_meta(
    "inside-bar-fail-01",
    {"en": "Inside Bar False Break at Resistance (Fakey)", "bn": "Resistance-এ inside bar-এর ভুয়া break (fakey)"},
    "XAUUSD", "H1", "bullish", "loss",
    ["inside-bar", "price-action", "fail", "fakey", "false-breakout", "pattern"],
    {"en": "Illustrative synthetic XAUUSD H1: an inside bar forms right under an old high. A buy stop above it fills when price pokes above the high, but the candle closes back inside the range. The next candle breaks the inside bar low and the stop goes: a fakey.",
     "bn": "শিক্ষামূলক কাল্পনিক XAUUSD H1: পুরোনো high-এর ঠিক নিচে একটি inside bar। দাম high-এর উপরে উঁকি দিলে buy stop fill হয়, কিন্তু candle আবার range-এর ভেতরে close করে। পরের candle inside bar-এর low ভাঙে, stop যায়: fakey।"},
    {"en": "Candle 5 leaves an old high. Candle 12 is a mother bar into it; candle 13 is an inside bar just under the level. Candle 14 breaks above the inside bar and the old high, fills the buy stop, then closes back inside: a false break. Candle 15 breaks the inside bar low and takes the stop. Traders call this a fakey, and it often trades the other way.",
     "bn": "৫ নম্বর candle একটি পুরোনো high রেখে যায়। ১২ নম্বর সেখানে mother bar; ১৩ নম্বর level-এর ঠিক নিচে inside bar। ১৪ নম্বর inside bar আর পুরোনো high-এর উপরে উঠে buy stop fill করে, তারপর আবার ভেতরে close করে: ভুয়া break। ১৫ নম্বর inside bar-এর low ভেঙে stop নেয়। Trader-রা একে fakey বলে, আর এটা প্রায়ই উল্টো দিকে যায়।"},
    [
        hline(res, "Old high (resistance)", BLUE),
        marker(12, "Mother bar"),
        marker(13, "Inside bar", below=False),
        marker(14, "False break", below=False),
        hline(entry, "Entry (IB high break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "An inside bar breaking into resistance often fails; watch for the fakey", "bn": "Resistance-এর দিকে inside bar break প্রায়ই ব্যর্থ; fakey-র দিকে নজর রাখুন"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=14, expect="loss"))
