from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: evening doji star at an old high, short at the third close ─────────────
P = 0.01
b = Builder(start=148.00, pip=P, seed=411, decimals=3)
b.walk([30, 40, -12, 35, 28])                                      # 0-4 rally
res = round(max(k["h"] for k in b.candles) + 4 * P, 3)
o = b.last
b.add(o=o, h=res, l=o - 15 * P, c=res - 30 * P)                    # 5 old high
b.walk([-35, -42, -25, 12, -30])                                   # 6-10 pullback
swing_low = round(min(k["l"] for k in b.candles[6:11]), 3)
b.walk([30, 34, 26])                                               # 11-13 rally back
o = b.last
b.add(o=o, h=max(o, res - 55 * P) + 3 * P, l=min(o, res - 55 * P) - 4 * P, c=res - 55 * P)   # 14
o = b.last
b.add(o=o, h=res - 2 * P, l=o - 3 * P, c=res - 6 * P)               # 15 STAR 1: long bullish into the old high
c1 = b.candles[-1]
b.add(o=c1["c"], h=res + 10 * P, l=c1["c"] - 4 * P, c=c1["c"] - 0.5 * P)   # 16 STAR 2: doji above the old high
s2 = b.candles[-1]
body1 = c1["c"] - c1["o"]
c3c = round(c1["c"] - 0.7 * body1, 3)
b.add(o=s2["c"], h=s2["c"] + 2 * P, l=c3c - 3 * P, c=c3c)           # 17 STAR 3: long bearish, 70% into candle 1
c3 = b.candles[-1]
entry = c3["c"]
stop = round(s2["h"] + 6 * P, 3)
target = round(entry - 2 * (stop - entry), 3)
b.add(o=c3["c"], h=c3["c"] + 8 * P, l=c3["c"] - 10 * P, c=c3["c"] - 6 * P)   # 18
b.walk([-30, 10, -36, -28, 8, -32, -24], wick=(0.15, 0.4))                  # 19-25 decline
print("c1", c1, "star", s2, "c3", c3, "entry", entry, "stop", stop, "target", target,
      "swing low", swing_low, "room R", round((entry - swing_low) / (stop - entry), 2))

meta = base_meta(
    "evening-star-win-01",
    {"en": "Evening Doji Star at an Old High, Short at the Third Close", "bn": "পুরোনো high-এ evening doji star, তৃতীয় candle-এর close-এ short"},
    "USDJPY", "D1", "bearish", "win",
    ["evening-star", "candlestick", "three-candle", "resistance", "pattern"],
    {"en": "Illustrative synthetic USDJPY D1: a long bullish day into an old high, a doji that pokes above it, then a long bearish day closing about 70% down into the first body. Short at the third close, stop above the star; price falls to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক USDJPY D1: পুরোনো high পর্যন্ত একটি লম্বা bullish দিন, তার উপরে উঁকি দেওয়া একটি doji, তারপর প্রথম body-র প্রায় 70% পর্যন্ত নামা লম্বা bearish দিন। তৃতীয় close-এ short, stop star-এর উপরে; দাম 2R পর্যন্ত নামে।"},
    {"en": "Candle 5 makes the old high. Candle 15 is a long bullish candle into it. Candle 16 is a doji that trades above the old high: the star. Candle 17 is a long bearish candle closing about 70% down into candle 15's body. Short at that close, stop above the star's high.",
     "bn": "৫ নম্বর candle পুরোনো high বানায়। ১৫ নম্বর সেখানে লম্বা bullish candle। ১৬ নম্বর একটি doji, পুরোনো high-এর উপরে যায়: star। ১৭ নম্বর লম্বা bearish candle, ১৫ নম্বরের body-র প্রায় 70% পর্যন্ত নেমে close করে। সেই close-এ short, stop star-এর high-এর উপরে।"},
    [
        hline(res, "Old high (resistance)", BLUE),
        marker(15, "1"),
        marker(16, "Star", below=False),
        marker(17, "3", below=False),
        hline(entry, "Entry (3rd close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Buying, stalling, selling: the evening star at a level", "bn": "কেনা, থমকে যাওয়া, বিক্রি: level-এ evening star"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=17, expect="win"))

# ───────────── FAIL: Friday evening star, Monday gaps over the stop (loss beyond 1R) ─────────────
P = 0.0001
b = Builder(start=1.0800, pip=P, seed=419)
b.walk([30, 35, -10, 40, 28, -12, 32])                             # 0-6 rally
o = b.last
b.add(o=o, h=o + 52 * P, l=o - 4 * P, c=o + 48 * P)                # 7 STAR 1 (Wednesday)
c1 = b.candles[-1]
b.add(o=c1["c"], h=c1["c"] + 14 * P, l=c1["c"] - 10 * P, c=c1["c"] - 2 * P)   # 8 STAR 2 (Thursday)
s2 = b.candles[-1]
c3c = round(c1["c"] - 0.62 * (c1["c"] - c1["o"]), 5)
b.add(o=s2["c"], h=s2["c"] + 3 * P, l=c3c - 4 * P, c=c3c)          # 9 STAR 3 (Friday close)
c3 = b.candles[-1]
entry = c3["c"]
stop = round(s2["h"] + 6 * P, 5)
target = round(entry - 2 * (stop - entry), 5)
gap_open = round(stop + 18 * P, 5)
b.add(o=gap_open, h=gap_open + 20 * P, l=gap_open - 8 * P, c=gap_open + 12 * P)   # 10 MONDAY gaps above the stop
b.walk([25, -10, 30], wick=(0.15, 0.4))                                       # 11-13 rally continues
loss_r = round((gap_open - entry) / (stop - entry), 2)
print("c1", c1, "star", s2, "c3", c3, "entry", entry, "stop", stop, "monday open", gap_open, "loss R", loss_r)

meta = base_meta(
    "evening-star-fail-01",
    {"en": "Friday Evening Star, Monday Gap Over the Stop", "bn": "শুক্রবারের evening star, সোমবার stop-এর ওপারে gap"},
    "EURUSD", "D1", "bearish", "loss",
    ["evening-star", "candlestick", "three-candle", "fail", "weekend-gap", "pattern"],
    {"en": "Illustrative synthetic EURUSD D1: an evening star completes on Friday and the short is taken at the close. Over the weekend news moves the market; Monday opens above the stop, so the stop fills at the open and the loss is larger than 1R.",
     "bn": "শিক্ষামূলক কাল্পনিক EURUSD D1: শুক্রবার একটি evening star সম্পূর্ণ হয়, close-এ short। Weekend-এ খবরে বাজার নড়ে; সোমবার stop-এর উপরে open, তাই stop open-এর দামে fill হয় আর লোকসান 1R-এর বেশি।"},
    {"en": "Candles 7-9 (Wednesday to Friday) form an evening star, and the short is opened at Friday's close. Candle 10, Monday, opens above the stop: Forex rarely gaps during the week, but it can at the weekend open. The stop order fills at the first available price, about 1.4R away instead of 1R.",
     "bn": "৭-৯ নম্বর candle (বুধবার থেকে শুক্রবার) evening star বানায়, শুক্রবারের close-এ short। ১০ নম্বর, সোমবার, stop-এর উপরে open করে: সপ্তাহের মাঝে Forex-এ gap কম, কিন্তু weekend open-এ হতে পারে। Stop order প্রথম পাওয়া দামে fill হয়, 1R-এর বদলে প্রায় 1.4R।"},
    [
        marker(7, "1 (Wed)"),
        marker(8, "Star (Thu)", below=False),
        marker(9, "3 (Fri)", below=False),
        marker(10, "Monday gap"),
        hline(entry, "Entry (Fri close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A stop is an order, not a guarantee; weekend gaps can skip it", "bn": "Stop একটি order, গ্যারান্টি নয়; weekend gap তা টপকে যেতে পারে"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=9, expect="loss"))
