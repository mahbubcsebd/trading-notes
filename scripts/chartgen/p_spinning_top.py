from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: spinning top at an old high after a rally, short on confirmation ─────────────
P = 0.01  # USDJPY pip
b = Builder(start=151.200, pip=P, seed=31, decimals=3)
b.walk([14, 18, -6, 16, 20, 12])                  # 0-5 rally to an old high
res = round(max(k["h"] for k in b.candles), 3)
b.walk([-15, -18, -10, -14, 8, -6])               # 6-11 pullback
b.walk([16, 12, 18, -5, 14])                      # 12-16 rally back
fill = round((res - 6 * P - b.last) / P)
assert 0 < fill < 40, fill
b.walk([fill])                                    # 17 arrives under the old high
o = b.last
st_idx = b.add(o=o, h=o + 14 * P, l=o - 13 * P, c=o - 3 * P)   # 18 SPINNING TOP
st = b.candles[st_idx]
entry = round(st["l"] - 2 * P, 3)
stop = round(st["h"] + 6 * P, 3)
assert stop > res, "stop must sit above the old high too"
target = round(entry - 2 * (stop - entry), 3)
b.add(o=st["c"], h=st["c"] + 3 * P, l=entry - 8 * P, c=entry - 5 * P)   # 19 bearish confirmation
b.walk([-14, -10, 6, -18, -12, -8, 5, -16, -14, -10], wick=(0.15, 0.4))  # 20-29 decline
print("spinning top", st, "res", res, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "spinning-top-win-01",
    {"en": "Spinning Top at an Old High, Short on Confirmation", "bn": "পুরোনো high-এ spinning top, confirmation-এর পর short"},
    "USDJPY", "H1", "bearish", "win",
    ["spinning-top", "candlestick", "indecision", "resistance", "pattern"],
    {"en": "Illustrative synthetic USDJPY H1: price rallies back to an old high and prints a spinning top. The next candle closes below the spinning top low, which fills a sell stop. Price falls to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক USDJPY H1: দাম আবার পুরোনো high-এ ফিরে একটি spinning top দেয়। পরের candle spinning top-এর low-এর নিচে close করে, sell stop fill হয়। দাম 2R পর্যন্ত নামে।"},
    {"en": "Candles 0-5 leave an old high. Candles 12-17 rally back into it. Candle 18 is a spinning top: a small body with wicks on both sides, right under the level. Candle 19 breaks and closes below its low, filling the sell stop. The stop sits above the spinning top high and the old high; price reaches 2R.",
     "bn": "০-৫ নম্বর candle একটি পুরোনো high রেখে যায়। ১২-১৭ নম্বর আবার সেখানে ওঠে। ১৮ নম্বর spinning top: ছোট body, দুই দিকে wick, ঠিক level-এর নিচে। ১৯ নম্বর তার low ভেঙে নিচে close করে, sell stop fill হয়। Stop spinning top-এর high আর পুরোনো high-এর উপরে; দাম 2R পর্যন্ত নামে।"},
    [
        hline(res, "Old high (resistance)", BLUE),
        marker(18, "Spinning top", below=False),
        marker(19, "Confirmation", below=False),
        hline(entry, "Entry (low break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A spinning top at a level is a question; the next candle is the answer", "bn": "Level-এ spinning top একটি প্রশ্ন; পরের candle তার উত্তর"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=19, expect="win"))

# ───────────── FAIL: spinning top in the middle of a strong uptrend, no level ─────────────
P = 0.0001
b = Builder(start=1.0700, pip=P, seed=41)
b.walk([30, -12, 35, 28, -15, 40, 32, -10, 36], wick=(0.15, 0.4))   # 0-8 strong uptrend
o = b.last
st_idx = b.add(o=o, h=o + 20 * P, l=o - 18 * P, c=o + 4 * P)       # 9 SPINNING TOP, no level
st = b.candles[st_idx]
entry = round(st["l"] - 3 * P, 5)
stop = round(st["h"] + 8 * P, 5)
target = round(entry - 2 * (stop - entry), 5)
b.add(o=st["c"], h=st["c"] + 8 * P, l=entry - 6 * P, c=st["c"] + 2 * P)   # 10 wick fills, closes back up
b.walk([25, 30, -10, 35, 30, -8, 28], wick=(0.15, 0.4))              # 11-17 trend resumes
print("spinning top", st, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "spinning-top-fail-01",
    {"en": "Spinning Top Mid-Trend With No Level", "bn": "কোনো level ছাড়া trend-এর মাঝখানে spinning top"},
    "EURUSD", "D1", "bearish", "loss",
    ["spinning-top", "candlestick", "fail", "location", "trend", "pattern"],
    {"en": "Illustrative synthetic EURUSD D1: a spinning top appears inside a strong uptrend with no resistance nearby. A sell stop under its low fills on a wick, but the candle closes back up and the trend continues through the stop.",
     "bn": "শিক্ষামূলক কাল্পনিক EURUSD D1: কাছে কোনো resistance নেই, শক্তিশালী uptrend-এর ভেতরে একটি spinning top। তার low-এর নিচের sell stop একটি wick-এ fill হয়, কিন্তু candle আবার উপরে close করে আর trend stop ভেঙে এগিয়ে যায়।"},
    {"en": "Candles 0-8 are a clean uptrend of higher highs and higher lows. Candle 9 is a spinning top by shape, but nothing sits above it: no old high, no zone. Candle 10 dips below its low, fills the sell stop and closes near its open. Candle 11 breaks the stop; the trend simply rested for one candle.",
     "bn": "০-৮ নম্বর candle পরিষ্কার uptrend, higher high ও higher low। ৯ নম্বর আকারে spinning top, কিন্তু উপরে কিছু নেই: পুরোনো high নেই, zone নেই। ১০ নম্বর তার low-এর নিচে নেমে sell stop fill করে, তারপর open-এর কাছে close করে। ১১ নম্বর stop ভাঙে; trend শুধু এক candle বিশ্রাম নিয়েছিল।"},
    [
        marker(9, "Spinning top (no level)", below=False),
        marker(10, "Closes back up"),
        hline(entry, "Entry (low break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Inside a strong trend a spinning top is usually just a pause", "bn": "শক্তিশালী trend-এর ভেতরে spinning top সাধারণত শুধু বিরতি"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=10, expect="loss"))
