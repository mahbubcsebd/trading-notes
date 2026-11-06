from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: rising three methods in an uptrend, entry at the fifth close ─────────────
P = 0.0001
b = Builder(start=1.2600, pip=P, seed=511)
b.walk([35, -12, 40, 30, -15, 38])                                  # 0-5 uptrend
o = b.last
b.add(o=o, h=o + 82 * P, l=o - 4 * P, c=o + 78 * P)                 # 6 long bullish candle 1
c1 = b.candles[-1]
lows = []
for d in [-14, -12, -10]:                                           # 7-9 three small bearish candles, shallow
    o = b.last
    c = round(o + d * P, 5)
    b.add(o=o, h=o + 4 * P, l=c - 4 * P, c=c)
    lows.append(b.candles[-1]["l"])
assert min(lows) > c1["l"] + 0.5 * (c1["c"] - c1["o"])              # pullback stays in the upper half
o = b.last
b.add(o=o, h=c1["c"] + 40 * P, l=o - 3 * P, c=c1["c"] + 36 * P)      # 10 long bullish candle 5, closes above candle 1
c5 = b.candles[-1]
entry = c5["c"]
stop = round(min(lows) - 8 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
b.add(o=c5["c"], h=c5["c"] + 10 * P, l=c5["c"] - 12 * P, c=c5["c"] + 4 * P)   # 11
b.walk([35, -14, 42, 30, -12, 38, 28, 30, 25], wick=(0.15, 0.4))             # 12-20 trend continues
print("c1", c1, "pullback lows", lows, "c5", c5, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "rising-three-methods-win-01",
    {"en": "Rising Three Methods in an Uptrend, Entry at the Fifth Close", "bn": "Uptrend-এ rising three methods, পঞ্চম close-এ entry"},
    "GBPUSD", "D1", "bullish", "win",
    ["rising-three-methods", "candlestick", "continuation", "trend", "pattern"],
    {"en": "Illustrative synthetic GBPUSD D1: in an uptrend, a long bullish day is followed by three small bearish days that stay in the upper half of its range, then a long bullish day closing above the first one's close. Long at that close, stop under the pullback; price reaches 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক GBPUSD D1: uptrend-এ একটি লম্বা bullish দিন, তারপর তিনটি ছোট bearish দিন তার range-এর উপরের অর্ধেকে থাকে, তারপর একটি লম্বা bullish দিন প্রথমটার close-এর উপরে close করে। সেই close-এ long, stop pullback-এর নিচে; দাম 2R পর্যন্ত যায়।"},
    {"en": "Candles 0-5 are an uptrend. Candle 6 is a long bullish candle. Candles 7-9 are three small bearish candles that never go below the middle of candle 6: a calm pause, not selling pressure. Candle 10 is a long bullish candle that closes above candle 6's close. Long at that close, stop under the pullback low.",
     "bn": "০-৫ নম্বর candle uptrend। ৬ নম্বর লম্বা bullish candle। ৭-৯ নম্বর তিনটি ছোট bearish candle, ৬ নম্বরের মাঝের নিচে কখনো যায় না: শান্ত বিরতি, selling চাপ নয়। ১০ নম্বর লম্বা bullish candle, ৬ নম্বরের close-এর উপরে close করে। সেই close-এ long, stop pullback-এর low-এর নিচে।"},
    [
        marker(6, "1"),
        marker(8, "Pause", below=False),
        marker(10, "5"),
        hline(c1["c"], "Candle 1 close", BLUE, style="dotted"),
        hline(entry, "Entry (5th close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A shallow, quiet pause inside a strong candle, then the trend resumes", "bn": "শক্তিশালী candle-এর ভেতরে অগভীর, শান্ত বিরতি, তারপর trend আবার চলে"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=10, expect="win"))

# ───────────── FAIL: deep pullback and a weak fifth candle ─────────────
D = 1.0
b = Builder(start=2320.0, pip=D, seed=517, decimals=2)
b.walk([8, -3, 9, 7, -4])                                           # 0-4 uptrend
o = b.last
b.add(o=o, h=o + 22, l=o - 1, c=o + 20)                             # 5 long bullish candle 1
c1 = b.candles[-1]
lows = []
for d in [-6, -5, -5]:                                              # 6-8 pullback: deep (almost 90% of candle 1)
    o = b.last
    c = round(o + d, 2)
    b.add(o=o, h=o + 1.5, l=c - 1.5, c=c)
    lows.append(b.candles[-1]["l"])
depth = round((c1["c"] - min(lows)) / (c1["c"] - c1["o"]), 2)
assert min(lows) > c1["l"] and depth > 0.7, depth
o = b.last
b.add(o=o, h=c1["c"] + 3, l=o - 0.5, c=c1["c"] + 0.8)                # 9 weak fifth candle, barely above candle 1's close
c5 = b.candles[-1]
entry = c5["c"]
stop = round(min(lows) - 2, 2)
target = round(entry + 2 * (entry - stop), 2)
c = c5["c"]
b.add(o=c, h=c + 1, l=c - 8, c=c - 7)                               # 10 fails
b.walk([-6, -5, 2, -7], wick=(0.15, 0.4))                           # 11-14 through the stop
print("c1", c1, "pullback lows", lows, "depth", depth, "c5", c5, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "rising-three-methods-fail-01",
    {"en": "Rising Three Methods With a Deep Pullback and a Weak Fifth Candle", "bn": "গভীর pullback আর দুর্বল পঞ্চম candle-এর rising three methods"},
    "XAUUSD", "H4", "bullish", "loss",
    ["rising-three-methods", "candlestick", "continuation", "fail", "pattern"],
    {"en": "Illustrative synthetic XAUUSD H4: a long bullish candle is followed by three bearish candles that retrace almost 90% of it, then a fifth candle that closes barely above the first candle's close. Bought at that close, the trade fails.",
     "bn": "শিক্ষামূলক কাল্পনিক XAUUSD H4: একটি লম্বা bullish candle, তারপর তিনটি bearish candle তার প্রায় 90% ফিরিয়ে নেয়, তারপর পঞ্চম candle প্রথম candle-এর close-এর সবে উপরে close করে। সেই close-এ buy, trade ব্যর্থ।"},
    {"en": "Candle 5 is a long bullish candle. Candles 6-8 retrace almost 90% of it: technically still inside its range, but that is real selling, not a quiet pause. Candle 9 closes only 80 cents above candle 5's close. Shape rules are barely met and quality fails. Bought at the close, the stop under the pullback goes.",
     "bn": "৫ নম্বর লম্বা bullish candle। ৬-৮ নম্বর তার প্রায় 90% ফিরিয়ে নেয়: নিয়মমতো range-এর ভেতরে, কিন্তু এটা আসল selling, শান্ত বিরতি নয়। ৯ নম্বর ৫ নম্বরের close-এর মাত্র 80 সেন্ট উপরে close করে। আকারের নিয়ম সবে পূরণ, মান ব্যর্থ। Close-এ buy, pullback-এর নিচের stop যায়।"},
    [
        marker(5, "1"),
        marker(7, "Deep pullback", below=False),
        marker(9, "Weak 5th", below=False),
        hline(c1["c"], "Candle 1 close", BLUE, style="dotted"),
        hline(entry, "Entry (5th close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Deep pullbacks and weak fifth candles turn a continuation into a failure", "bn": "গভীর pullback আর দুর্বল পঞ্চম candle continuation-কে ব্যর্থ করে"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=9, expect="loss"))
