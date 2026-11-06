from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: falling three methods in a downtrend, entry at the fifth close ─────────────
P = 0.0001
b = Builder(start=1.0950, pip=P, seed=531)
b.walk([-30, 10, -35, -28, 12, -32])                                # 0-5 downtrend
o = b.last
b.add(o=o, h=o + 4 * P, l=o - 72 * P, c=o - 68 * P)                 # 6 long bearish candle 1
c1 = b.candles[-1]
highs = []
for d in [12, 10, 9]:                                               # 7-9 three small bullish candles, shallow
    o = b.last
    c = round(o + d * P, 5)
    b.add(o=o, h=c + 4 * P, l=o - 3 * P, c=c)
    highs.append(b.candles[-1]["h"])
assert max(highs) < c1["h"] - 0.5 * (c1["o"] - c1["c"])              # pause stays in the lower half
o = b.last
b.add(o=o, h=o + 3 * P, l=c1["c"] - 36 * P, c=c1["c"] - 32 * P)      # 10 long bearish candle 5, closes below candle 1
c5 = b.candles[-1]
entry = c5["c"]
stop = round(max(highs) + 8 * P, 5)
target = round(entry - 2 * (stop - entry), 5)
b.add(o=c5["c"], h=c5["c"] + 10 * P, l=c5["c"] - 8 * P, c=c5["c"] - 4 * P)   # 11
b.walk([-30, 12, -36, -26, 10, -32, -24, -20], wick=(0.15, 0.4))             # 12-19 trend continues
print("c1", c1, "pause highs", highs, "c5", c5, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "falling-three-methods-win-01",
    {"en": "Falling Three Methods in a Downtrend, Entry at the Fifth Close", "bn": "Downtrend-এ falling three methods, পঞ্চম close-এ entry"},
    "EURUSD", "H4", "bearish", "win",
    ["falling-three-methods", "candlestick", "continuation", "trend", "pattern"],
    {"en": "Illustrative synthetic EURUSD H4: in a downtrend, a long bearish candle is followed by three small bullish candles in the lower half of its range, then a long bearish candle closing below the first one's close. Short at that close, stop above the pause; price falls to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক EURUSD H4: downtrend-এ একটি লম্বা bearish candle, তারপর তিনটি ছোট bullish candle তার range-এর নিচের অর্ধেকে, তারপর একটি লম্বা bearish candle প্রথমটার close-এর নিচে close করে। সেই close-এ short, stop বিরতির উপরে; দাম 2R পর্যন্ত নামে।"},
    {"en": "Candles 0-5 are a downtrend. Candle 6 is a long bearish candle. Candles 7-9 are three small, calm bullish candles that stay in the lower half of candle 6. Candle 10 is a long bearish candle closing below candle 6's close. Short at that close, stop above the pause high.",
     "bn": "০-৫ নম্বর candle downtrend। ৬ নম্বর লম্বা bearish candle। ৭-৯ নম্বর তিনটি ছোট, শান্ত bullish candle, ৬ নম্বরের নিচের অর্ধেকে থাকে। ১০ নম্বর লম্বা bearish candle, ৬ নম্বরের close-এর নিচে close করে। সেই close-এ short, stop বিরতির high-এর উপরে।"},
    [
        marker(6, "1", below=False),
        marker(8, "Pause"),
        marker(10, "5", below=False),
        hline(c1["c"], "Candle 1 close", BLUE, style="dotted"),
        hline(entry, "Entry (5th close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A calm, shallow pause inside the trend, then the trend resumes", "bn": "Trend-এর ভেতরে শান্ত, অগভীর বিরতি, তারপর trend আবার চলে"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=10, expect="win"))

# ───────────── FAIL: a noisy, two-sided pause instead of a calm one ─────────────
P = 0.01
b = Builder(start=151.80, pip=P, seed=537, decimals=3)
b.walk([-18, 6, -20, -15, 5])                                       # 0-4 downtrend
o = b.last
b.add(o=o, h=o + 3 * P, l=o - 70 * P, c=o - 66 * P)                 # 5 long bearish candle 1
c1 = b.candles[-1]
highs = []
for d, up, dn in [(16, 18, 3), (-4, 16, 14), (6, 18, 12)]:          # 6-8 noisy pause: big wicks both ways
    o = b.last
    c = round(o + d * P, 3)
    b.add(o=o, h=max(o, c) + up * P, l=min(o, c) - dn * P, c=c)
    highs.append(b.candles[-1]["h"])
assert max(highs) < c1["o"] and min(k["l"] for k in b.candles[6:9]) > c1["l"]
o = b.last
b.add(o=o, h=o + 2 * P, l=c1["c"] - 6 * P, c=c1["c"] - 3 * P)       # 9 fifth candle, closes just below candle 1's close
c5 = b.candles[-1]
entry = c5["c"]
stop = round(max(highs) + 4 * P, 3)
target = round(entry - 2 * (stop - entry), 3)
c = c5["c"]
b.add(o=c, h=c + 22 * P, l=c - 6 * P, c=c + 18 * P)                  # 10 snaps back
b.walk([16, 14, -5, 18], wick=(0.15, 0.4))                           # 11-14 through the stop
pause_avg_range = round(sum(k["h"] - k["l"] for k in b.candles[6:9]) / 3 / P, 1)
c1_range = round((c1["h"] - c1["l"]) / P, 1)
print("c1", c1, "pause highs", highs, "pause avg range pips", pause_avg_range, "c1 range", c1_range,
      "c5", c5, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "falling-three-methods-fail-01",
    {"en": "Falling Three Methods With a Noisy, Two-Sided Pause", "bn": "এলোমেলো, দুই দিকের বিরতি-সহ falling three methods"},
    "USDJPY", "H1", "bearish", "loss",
    ["falling-three-methods", "candlestick", "continuation", "fail", "volatility", "pattern"],
    {"en": "Illustrative synthetic USDJPY H1: after a long bearish candle, the three middle candles stay inside its range but swing with big wicks in both directions, each about half as wide as the first candle. The fifth candle closes just below the first one's close; the short fails as price snaps back.",
     "bn": "শিক্ষামূলক কাল্পনিক USDJPY H1: একটি লম্বা bearish candle-এর পর মাঝের তিনটি candle তার range-এর ভেতরে থাকে, কিন্তু দুই দিকে বড় wick নিয়ে দোলে, প্রতিটি প্রথম candle-এর প্রায় অর্ধেক চওড়া। পঞ্চম candle প্রথমটার close-এর সামান্য নিচে close করে; দাম ফিরে এলে short ব্যর্থ।"},
    {"en": "Candle 5 is a long bearish candle. Candles 6-8 stay inside its range, but each one swings 30-40 pips both ways: that is a two-sided fight, not a calm pause. Candle 9 closes only 3 pips below candle 5's close. Short at that close; candle 10 snaps back and the stop above the pause goes.",
     "bn": "৫ নম্বর লম্বা bearish candle। ৬-৮ নম্বর তার range-এর ভেতরে থাকে, কিন্তু প্রতিটি দুই দিকে 30-40 pip দোলে: এটা দুই পক্ষের লড়াই, শান্ত বিরতি নয়। ৯ নম্বর ৫ নম্বরের close-এর মাত্র 3 pip নিচে close করে। সেই close-এ short; ১০ নম্বর ফিরে আসে, বিরতির উপরের stop যায়।"},
    [
        marker(5, "1", below=False),
        marker(7, "Noisy pause"),
        marker(9, "Weak 5th", below=False),
        hline(c1["c"], "Candle 1 close", BLUE, style="dotted"),
        hline(entry, "Entry (5th close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A pause with big wicks both ways is a fight, not a rest", "bn": "দুই দিকে বড় wick-ওয়ালা বিরতি বিশ্রাম নয়, লড়াই"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=9, expect="loss"))
