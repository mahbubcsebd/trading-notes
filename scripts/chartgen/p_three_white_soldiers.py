from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: three white soldiers out of a base, entry on a pullback into the third body ─────────────
P = 0.0001
b = Builder(start=1.2700, pip=P, seed=431)
b.walk([-20, -25, -15, -18])                                       # 0-3 decline
b.walk([6, -5, 7, -6, 5, -4, 6, -5], wick=(0.3, 0.6))              # 4-11 base
base_hi = round(max(k["h"] for k in b.candles[4:12]), 5)
o = b.last
b.add(o=o, h=o + 30 * P, l=o - 3 * P, c=o + 28 * P)                # 12 SOLDIER 1
s1 = b.candles[-1]
o = s1["c"]
b.add(o=o, h=o + 36 * P, l=o - 2 * P, c=o + 34 * P)                # 13 SOLDIER 2 (Forex: opens at the prior close)
s2 = b.candles[-1]
o = s2["c"]
b.add(o=o, h=o + 34 * P, l=o - 2 * P, c=o + 32 * P)                # 14 SOLDIER 3
s3 = b.candles[-1]
assert s3["c"] > base_hi + 40 * P
entry = round((s3["o"] + s3["c"]) / 2, 5)                          # limit at 50% of the third body
stop = round(s2["o"] - 4 * P, 5)                                   # below the second soldier's open
target = round(entry + 2 * (entry - stop), 5)
c = s3["c"]
b.add(o=c, h=c + 6 * P, l=entry + 5 * P, c=entry + 9 * P)          # 15 pause
c = b.last
b.add(o=c, h=c + 4 * P, l=entry - 3 * P, c=entry + 6 * P)          # 16 fills the limit
b.walk([16, -6, 20, 14, -8, 18, 12, 15, 10, 12], wick=(0.15, 0.4))  # 17-26 trend continues
print("soldiers", s1, s2, s3, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "three-white-soldiers-win-01",
    {"en": "Three White Soldiers Out of a Base, Pullback Entry", "bn": "Base থেকে three white soldiers, pullback-এ entry"},
    "GBPUSD", "H4", "bullish", "win",
    ["three-white-soldiers", "candlestick", "three-candle", "breakout", "pattern"],
    {"en": "Illustrative synthetic GBPUSD H4: after a decline and a flat base, three long bullish candles each open at the previous close and close near their highs, breaking out of the base. Instead of chasing, a buy limit at 50% of the third body fills on the pullback; price reaches 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক GBPUSD H4: পতন আর সমতল base-এর পর তিনটি লম্বা bullish candle, প্রতিটি আগের close-এ open করে high-এর কাছে close, base থেকে বেরিয়ে যায়। তাড়া না করে তৃতীয় body-র 50%-এ buy limit pullback-এ fill হয়; দাম 2R পর্যন্ত যায়।"},
    {"en": "Candles 4-11 form a flat base after the decline. Candles 12-14 are three white soldiers: each opens at the prior close and closes near its high, with no long upper wicks. The third closes well above the base. A buy limit at 50% of the third body fills on candle 16; the stop sits below the second soldier's open.",
     "bn": "৪-১১ নম্বর candle পতনের পর সমতল base। ১২-১৪ নম্বর three white soldiers: প্রতিটি আগের close-এ open করে high-এর কাছে close করে, লম্বা upper wick নেই। তৃতীয়টা base-এর অনেক উপরে close করে। তৃতীয় body-র 50%-এ buy limit ১৬ নম্বরে fill হয়; stop দ্বিতীয় soldier-এর open-এর নিচে।"},
    [
        hline(base_hi, "Base high", BLUE),
        marker(12, "1"),
        marker(13, "2"),
        marker(14, "3"),
        hline(entry, "Entry (50% of 3rd)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Three soldiers mark strength; the entry still waits for a pullback", "bn": "তিন soldier শক্তির চিহ্ন; entry তবু pullback-এর অপেক্ষা করে"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=16, expect="win"))

# ───────────── FAIL: an advance block (shrinking bodies, growing upper wicks) into resistance ─────────────
D = 1.0
b = Builder(start=2350.0, pip=D, seed=433, decimals=2)
b.walk([8, 10, -3, 9, 7])                                          # 0-4 rally
res = round(max(k["h"] for k in b.candles) + 2, 2)
o = b.last
b.add(o=o, h=res, l=o - 4, c=res - 7)                              # 5 old high
b.walk([-9, -11, -7, 3, -8])                                       # 6-10 pullback
o = b.last
b.add(o=o, h=o + 15, l=o - 1, c=o + 14)                            # 11 SOLDIER 1: big body
s1 = b.candles[-1]
o = s1["c"]
b.add(o=o, h=o + 13, l=o - 1, c=o + 9)                             # 12 SOLDIER 2: smaller, upper wick
s2 = b.candles[-1]
o = s2["c"]
b.add(o=o, h=res + 1, l=o - 1, c=o + 4)                            # 13 SOLDIER 3: small body, long upper wick at the old high
s3 = b.candles[-1]
entry = s3["c"]                                                    # chased at the third close
stop = round(s1["l"] - 2, 2)
target = round(entry + 2 * (entry - stop), 2)
c = s3["c"]
b.add(o=c, h=c + 2, l=c - 12, c=c - 10)                            # 14 reversal
b.walk([-12, -9, 3, -14], wick=(0.15, 0.4))                         # 15-18 through the stop
print("soldiers", s1, s2, s3, "entry", entry, "stop", stop, "target", target, "res", res)

meta = base_meta(
    "three-white-soldiers-fail-01",
    {"en": "Advance Block Into an Old High, Bought at the Third Close", "bn": "পুরোনো high-এ advance block, তৃতীয় close-এ buy"},
    "XAUUSD", "H4", "bullish", "loss",
    ["three-white-soldiers", "advance-block", "candlestick", "three-candle", "fail", "pattern"],
    {"en": "Illustrative synthetic XAUUSD H4: three bullish candles rise into an old high, but each body is smaller than the last and the upper wicks grow: an advance block. Bought at the third close, the trade reverses and the stop below the first candle goes.",
     "bn": "শিক্ষামূলক কাল্পনিক XAUUSD H4: তিনটি bullish candle পুরোনো high-এর দিকে ওঠে, কিন্তু প্রতিটির body আগেরটার চেয়ে ছোট আর upper wick বড় হতে থাকে: advance block। তৃতীয় close-এ buy, দাম উল্টে প্রথম candle-এর নিচের stop নেয়।"},
    {"en": "Candle 5 leaves an old high. Candles 11-13 are three bullish candles, but the bodies shrink ($14, $9, $4) and the upper wicks grow, the third reaching the old high and closing far below it. Nison calls this an advance block: buyers are tiring. Bought at the third close, the stop sits under the first candle; candles 14-17 fall through it.",
     "bn": "৫ নম্বর candle একটি পুরোনো high রেখে যায়। ১১-১৩ নম্বর তিনটি bullish candle, কিন্তু body ছোট হতে থাকে ($14, $9, $4) আর upper wick বড়; তৃতীয়টা পুরোনো high ছুঁয়ে তার অনেক নিচে close করে। Nison একে advance block বলেছেন: buyers ক্লান্ত। তৃতীয় close-এ buy, stop প্রথম candle-এর নিচে; ১৪-১৭ নম্বর তা ভেঙে নামে।"},
    [
        hline(res, "Old high (resistance)", BLUE),
        marker(11, "1"),
        marker(12, "2 (smaller)"),
        marker(13, "3 (long wick)", below=False),
        hline(entry, "Entry (3rd close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Shrinking bodies and growing upper wicks turn soldiers into an advance block", "bn": "ছোট হতে থাকা body আর বড় হতে থাকা upper wick soldiers-কে advance block বানায়"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=13, expect="loss"))
