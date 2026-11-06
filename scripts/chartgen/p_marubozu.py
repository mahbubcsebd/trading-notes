from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: bullish marubozu breaks a range, entry on 50% body retest ─────────────
P = 0.0001
b = Builder(start=1.0860, pip=P, seed=5)
b.walk([8, 10, -12, -9, 11, 9, -14, -8, 10, 12, -10, -6], wick=(0.2, 0.5))  # 0-11 range
range_top = max(k["h"] for k in b.candles)
range_bot = min(k["l"] for k in b.candles)
o = b.last
m_idx = b.add(o=o, h=o + 43 * P, l=o - 1 * P, c=o + 42 * P)  # 12 MARUBOZU
mb = b.candles[m_idx]
assert mb["c"] > range_top + 10 * P, "marubozu must close clearly above range"
entry = round((mb["o"] + mb["c"]) / 2, 5)  # 50% of body
stop = round(mb["l"] - 5 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
c = mb["c"]
b.add(o=c, h=c + 7 * P, l=c - 4 * P, c=c + 4 * P)                       # 13 small follow-through
c = b.last
b.add(o=c, h=c + 2 * P, l=entry + 4 * P, c=entry + 8 * P)               # 14 pullback (no fill yet)
c = b.last
b.add(o=c, h=c + 3 * P, l=entry - 3 * P, c=entry + 7 * P)               # 15 retest fills buy limit
b.walk([12, 8, -5, 14, 10, -6, 12, 9, 7, 11, 6], wick=(0.15, 0.4))      # 16-26 rally
print("marubozu", mb, "range", range_bot, range_top, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "marubozu-win-01",
    {"en": "Bullish Marubozu Range Breakout, 50% Body Retest", "bn": "Range ভাঙা bullish marubozu, body-র 50% retest-এ entry"},
    "EURUSD", "H1", "bullish", "win",
    ["marubozu", "candlestick", "breakout", "range", "pattern"],
    {"en": "Illustrative synthetic EURUSD H1: after twelve candles inside a range, a bullish marubozu closes well above the range top. Price pulls back to the middle of its body, fills a buy limit and continues higher.",
     "bn": "শিক্ষামূলক কাল্পনিক EURUSD H1: বারোটি candle range-এর ভেতরে থাকার পর একটি bullish marubozu range-এর উপরে স্পষ্টভাবে close করে। দাম তার body-র মাঝামাঝি ফিরে buy limit fill করে, তারপর উপরে যায়।"},
    {"en": "Candles 0-11 build a range. Candle 12 is a marubozu: almost no wicks, body about four times the earlier candles, close far above the range top. The buy limit sits at 50% of its body, the stop under its low. Candle 15 fills the order; price reaches 2R.",
     "bn": "০-১১ নম্বর candle একটি range তৈরি করে। ১২ নম্বর marubozu: প্রায় wick নেই, body আগের candle-গুলোর প্রায় চার গুণ, close range-এর অনেক উপরে। Buy limit body-র 50%-এ, stop তার low-এর নিচে। ১৫ নম্বর order fill করে; দাম 2R পর্যন্ত যায়।"},
    [
        hline(round(range_top, 5), "Range top", BLUE),
        marker(12, "Marubozu"),
        marker(15, "50% retest"),
        hline(entry, "Entry (50% body)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A marubozu that breaks a level is a fact; the entry comes on the pullback", "bn": "Level ভাঙা marubozu একটি তথ্য; entry আসে pullback-এ"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=15, expect="win"))

# ───────────── FAIL: late bullish marubozu into resistance after an extended rally ─────────────
D = 1.0  # 1 unit = $1 on XAUUSD
b = Builder(start=2380.0, pip=D, seed=17, decimals=2)
b.walk([8, 10, 7, -3], wick=(0.15, 0.4))                    # 0-3 rally to an old high
resistance = round(max(k["h"] for k in b.candles), 2)
b.walk([-12, -15, -10, -14, -11, -9], wick=(0.15, 0.4))      # 4-9 decline
b.walk([7, 9, 6, 8, 7, 9], wick=(0.1, 0.3))                  # 10-15 extended rally, no pullback
o = b.last
m_idx = b.add(o=o, h=o + 28.4, l=o - 0.3, c=o + 28)          # 16 MARUBOZU into resistance
mb = b.candles[m_idx]
assert abs(mb["c"] - resistance) < 6, (mb["c"], resistance)
entry = round((mb["o"] + mb["c"]) / 2, 2)
stop = round(mb["l"] - 2, 2)
target = round(entry + 2 * (entry - stop), 2)
c = mb["c"]
b.add(o=c, h=c + 3.5, l=entry + 4, c=c - 7)                   # 17 rejected at resistance
c = b.last
b.add(o=c, h=c + 2, l=entry - 3, c=entry - 1)                # 18 fills buy limit, weak close
b.walk([-6, -9, -5, -8, -7], wick=(0.15, 0.4))               # 19-23 reversal
print("marubozu", mb, "resistance", resistance, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "marubozu-fail-01",
    {"en": "Late Marubozu Into Resistance After an Extended Rally", "bn": "লম্বা rally-র শেষে resistance-এ দেরিতে আসা marubozu"},
    "XAUUSD", "H4", "bullish", "loss",
    ["marubozu", "candlestick", "fail", "exhaustion", "resistance", "pattern"],
    {"en": "Illustrative synthetic XAUUSD H4: after six straight bullish candles, a large bullish marubozu closes right at an old high. The 50% retest fills, but the next candles reverse and break the marubozu low.",
     "bn": "শিক্ষামূলক কাল্পনিক XAUUSD H4: টানা ছয়টি bullish candle-এর পর একটি বড় bullish marubozu ঠিক পুরোনো high-এ close করে। 50% retest fill হয়, কিন্তু পরের candle-গুলো উল্টে marubozu-র low ভাঙে।"},
    {"en": "Candles 0-3 leave an old high (resistance). Candles 10-15 rally without a pause. Candle 16 is a perfect marubozu, but it closes into that resistance with no room to a 2R target. Candle 17 is rejected there; candle 18 fills the buy limit; the stop goes soon after.",
     "bn": "০-৩ নম্বর candle একটি পুরোনো high (resistance) রেখে যায়। ১০-১৫ নম্বর বিরতি ছাড়া ওঠে। ১৬ নম্বর নিখুঁত marubozu, কিন্তু সেই resistance-এ close করে, 2R target-এর জায়গা নেই। ১৭ নম্বর সেখানে প্রত্যাখ্যাত হয়; ১৮ নম্বর buy limit fill করে; কিছু পরেই stop।"},
    [
        hline(resistance, "Old high (resistance)", BLUE),
        marker(16, "Late marubozu"),
        marker(17, "Rejected", below=False),
        hline(entry, "Entry (50% body)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A marubozu at the end of a long run, into a level, is often the last push", "bn": "লম্বা দৌড়ের শেষে level-এ marubozu প্রায়ই শেষ ধাক্কা"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=18, expect="loss"))
