from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: three black crows break out of a top range, pullback entry ─────────────
P = 0.0001
b = Builder(start=1.0800, pip=P, seed=451)
b.walk([18, 22, 15, 20])                                           # 0-3 rally
b.walk([-6, 5, -7, 6, -5, 4, -6, 5], wick=(0.3, 0.6))              # 4-11 top range
range_lo = round(min(k["l"] for k in b.candles[4:12]), 5)
o = b.last
b.add(o=o, h=o + 3 * P, l=o - 30 * P, c=o - 28 * P)                # 12 CROW 1
c1 = b.candles[-1]
o = c1["c"]
b.add(o=o, h=o + 2 * P, l=o - 35 * P, c=o - 33 * P)                # 13 CROW 2
c2 = b.candles[-1]
o = c2["c"]
b.add(o=o, h=o + 2 * P, l=o - 33 * P, c=o - 31 * P)                # 14 CROW 3
c3 = b.candles[-1]
assert c3["c"] < range_lo - 40 * P
entry = round((c3["o"] + c3["c"]) / 2, 5)                          # sell limit at 50% of the third body
stop = round(c2["o"] + 4 * P, 5)                                   # above the second crow's open
target = round(entry - 2 * (stop - entry), 5)
c = c3["c"]
b.add(o=c, h=entry - 5 * P, l=c - 6 * P, c=entry - 9 * P)          # 15 pause
c = b.last
b.add(o=c, h=entry + 3 * P, l=c - 4 * P, c=entry - 6 * P)          # 16 fills the limit
b.walk([-16, 6, -20, -14, 8, -18, -12, -15, -10, -12], wick=(0.15, 0.4))   # 17-26 decline
print("crows", c1, c2, c3, "entry", entry, "stop", stop, "target", target, "range lo", range_lo)

meta = base_meta(
    "three-black-crows-win-01",
    {"en": "Three Black Crows Out of a Top Range, Pullback Entry", "bn": "উপরের range থেকে three black crows, pullback-এ entry"},
    "EURUSD", "H1", "bearish", "win",
    ["three-black-crows", "candlestick", "three-candle", "breakdown", "pattern"],
    {"en": "Illustrative synthetic EURUSD H1: after a rally and a flat top range, three long bearish candles each open at the previous close and close near their lows, breaking the range floor. A sell limit at 50% of the third body fills on the pullback; price falls to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক EURUSD H1: rally আর উপরের সমতল range-এর পর তিনটি লম্বা bearish candle, প্রতিটি আগের close-এ open করে low-এর কাছে close, range-এর তলা ভাঙে। তৃতীয় body-র 50%-এ sell limit pullback-এ fill হয়; দাম 2R পর্যন্ত নামে।"},
    {"en": "Candles 4-11 form a flat range at the top of the rally. Candles 12-14 are three black crows with similar large bodies and small lower wicks, breaking well below the range floor. A sell limit at 50% of the third body fills on candle 16; the stop sits above the second crow's open.",
     "bn": "৪-১১ নম্বর candle rally-র মাথায় সমতল range। ১২-১৪ নম্বর three black crows, একই রকম বড় body, ছোট lower wick, range-এর তলার অনেক নিচে। তৃতীয় body-র 50%-এ sell limit ১৬ নম্বরে fill হয়; stop দ্বিতীয় crow-এর open-এর উপরে।"},
    [
        hline(range_lo, "Range floor", BLUE),
        marker(12, "1", below=False),
        marker(13, "2", below=False),
        marker(14, "3", below=False),
        hline(entry, "Entry (50% of 3rd)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Three crows out of a top: sell the pullback, not the third close", "bn": "চূড়া থেকে তিন crow: তৃতীয় close নয়, pullback-এ sell"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=16, expect="win"))

# ───────────── FAIL: three black crows at the end of a long decline, into major support ─────────────
P = 0.01
b = Builder(start=152.00, pip=P, seed=457, decimals=3)
b.walk([-40, -55, 15, -50, -45, 12, -60, -48, 10, -52], wick=(0.15, 0.4))   # 0-9 long decline
support = round(min(k["l"] for k in b.candles) - 95 * P, 3)
o = b.last
b.add(o=o, h=o + 4 * P, l=o - 32 * P, c=o - 30 * P)                # 10 CROW 1
c1 = b.candles[-1]
o = c1["c"]
b.add(o=o, h=o + 3 * P, l=o - 34 * P, c=o - 32 * P)                # 11 CROW 2
c2 = b.candles[-1]
o = c2["c"]
b.add(o=o, h=o + 3 * P, l=support + 2 * P, c=support + 6 * P)       # 12 CROW 3 into major support
c3 = b.candles[-1]
entry = c3["c"]                                                     # sold at the third close
stop = round(c2["o"] + 5 * P, 3)
target = round(entry - 2 * (stop - entry), 3)
c = c3["c"]
b.add(o=c, h=c + 30 * P, l=c - 4 * P, c=c + 26 * P)                 # 13 bounce off support
b.walk([35, 25, -10, 30], wick=(0.15, 0.4))                         # 14-17 short covering rally through the stop
print("crows", c1, c2, c3, "entry", entry, "stop", stop, "target", target, "support", support)

meta = base_meta(
    "three-black-crows-fail-01",
    {"en": "Three Black Crows at the End of a Long Decline", "bn": "লম্বা পতনের শেষে three black crows"},
    "USDJPY", "D1", "bearish", "loss",
    ["three-black-crows", "candlestick", "three-candle", "fail", "exhaustion", "pattern"],
    {"en": "Illustrative synthetic USDJPY D1: after a long, steep decline, three more large bearish days drive straight into a major support. Sold at the third close, the trade is caught in a sharp bounce as shorts take profit, and the stop above the second crow goes.",
     "bn": "শিক্ষামূলক কাল্পনিক USDJPY D1: লম্বা, খাড়া পতনের পর আরও তিনটি বড় bearish দিন সোজা একটি বড় support-এ নামে। তৃতীয় close-এ sell, short-রা profit নিলে তীব্র bounce, আর দ্বিতীয় crow-এর উপরের stop যায়।"},
    {"en": "Candles 0-9 are already a long, steep decline. Candles 10-12 are three black crows by shape, but they come late and the third one lands right on a major support. Nison warns that crows after a long decline can mean the market is oversold. Candle 13 bounces hard and the rally takes the stop.",
     "bn": "০-৯ নম্বর candle ইতিমধ্যে লম্বা, খাড়া পতন। ১০-১২ নম্বর আকারে three black crows, কিন্তু দেরিতে এসেছে, আর তৃতীয়টা ঠিক একটি বড় support-এ নামে। Nison সতর্ক করেছেন: লম্বা পতনের পর crows মানে বাজার oversold হতে পারে। ১৩ নম্বর জোরে bounce করে, rally stop নেয়।"},
    [
        hline(support, "Major support", BLUE),
        marker(10, "1", below=False),
        marker(11, "2", below=False),
        marker(12, "3 (at support)", below=False),
        hline(entry, "Entry (3rd close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Crows that arrive late, into support, often mark the end of the fall", "bn": "দেরিতে, support-এ আসা crows প্রায়ই পতনের শেষ চিহ্ন"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=12, expect="loss"))
