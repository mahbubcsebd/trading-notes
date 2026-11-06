from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN


def sma(values, n):
    out = []
    for i in range(len(values)):
        out.append(None if i < n - 1 else round(sum(values[i - n + 1:i + 1]) / n, 5))
    return out


# ───────────── WIN: morning star at a tested support, entry at the third candle's close ─────────────
P = 0.0001
b = Builder(start=1.2750, pip=P, seed=391)
b.walk([-14, -18, -12, -16])                                      # 0-3 decline
support = round(min(k["l"] for k in b.candles) - 3 * P, 4)
o = b.last
b.add(o=o, h=o + 5 * P, l=support, c=support + 12 * P)            # 4 first touch
b.walk([20, 24, -8, 22, 16])                                      # 5-9 bounce
swing_high = round(max(k["h"] for k in b.candles[5:10]), 5)
b.walk([-16, -18, -14])                                           # 10-12 back down
o = b.last
b.add(o=o, h=o + 3 * P, l=min(o, support + 28 * P) - 2 * P, c=support + 28 * P)   # 13 near support
o = b.last
b.add(o=o, h=o + 2 * P, l=support + 2 * P, c=support + 4 * P)      # 14 STAR 1: long bearish
c1 = b.candles[-1]
b.add(o=c1["c"], h=c1["c"] + 4 * P, l=support - 6 * P, c=c1["c"] + 0.5 * P)   # 15 STAR 2: doji below support
s2 = b.candles[-1]
body1 = c1["o"] - c1["c"]
c3c = round(c1["c"] + 0.72 * body1, 5)
b.add(o=s2["c"], h=c3c + 2 * P, l=s2["c"] - 1 * P, c=c3c)          # 16 STAR 3: long bullish, 72% into candle 1
c3 = b.candles[-1]
entry = c3["c"]
stop = round(s2["l"] - 4 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
b.add(o=c3["c"], h=c3["c"] + 6 * P, l=c3["c"] - 6 * P, c=c3["c"] + 3 * P)   # 17
b.walk([14, -5, 16, 12, -6, 15, 10], wick=(0.15, 0.4))                     # 18-24 rally
print("c1", c1, "star", s2, "c3", c3, "entry", entry, "stop", stop, "target", target,
      "swing", swing_high, "room R", round((swing_high - entry) / (entry - stop), 2))

meta = base_meta(
    "morning-star-win-01",
    {"en": "Morning Doji Star at Tested Support, Entry at the Third Close", "bn": "পরীক্ষিত support-এ morning doji star, তৃতীয় candle-এর close-এ entry"},
    "GBPUSD", "H1", "bullish", "win",
    ["morning-star", "candlestick", "three-candle", "support", "pattern"],
    {"en": "Illustrative synthetic GBPUSD H1: a long bearish candle into support, a doji that dips below it, then a long bullish candle closing about 72% into the first candle's body. Long at the third close, stop under the star; price reaches 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক GBPUSD H1: support পর্যন্ত লম্বা bearish candle, তার নিচে উঁকি দেওয়া একটি doji, তারপর প্রথম candle-এর body-র প্রায় 72% পর্যন্ত ওঠা লম্বা bullish candle। তৃতীয় close-এ long, stop star-এর নিচে; দাম 2R পর্যন্ত যায়।"},
    {"en": "Candle 4 marks support. Candle 14 is a long bearish candle into it. Candle 15 is a doji that trades below support: the star. Candle 16 is a long bullish candle that closes about 72% back into candle 14's body. The three together form a morning doji star. Long at candle 16's close, stop under the star's low.",
     "bn": "৪ নম্বর candle support চিহ্নিত করে। ১৪ নম্বর সেখানে লম্বা bearish candle। ১৫ নম্বর একটি doji, support-এর নিচে যায়: star। ১৬ নম্বর লম্বা bullish candle, ১৪ নম্বরের body-র প্রায় 72% পর্যন্ত ফিরে close করে। তিনটি মিলে morning doji star। ১৬ নম্বরের close-এ long, stop star-এর low-এর নিচে।"},
    [
        hline(support, "Support", BLUE),
        marker(14, "1", below=False),
        marker(15, "Star"),
        marker(16, "3"),
        hline(entry, "Entry (3rd close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Three candles tell the full story: selling, stalling, buying", "bn": "তিন candle পুরো গল্প বলে: বিক্রি, থমকে যাওয়া, কেনা"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=16, expect="win"))

# ───────────── FAIL: morning star under a falling SMA 20 (dynamic resistance) ─────────────
D = 1.0
b = Builder(start=2480.0, pip=D, seed=397, decimals=2)
b.walk([-12, -15, 5, -14, -10, 4, -16, -12, 6, -14], wick=(0.15, 0.4))   # 0-9 downtrend
b.walk([-4, 3, -5, 2, -4, 3, -3, 2, -4, -2], wick=(0.2, 0.5))            # 10-19 slow grind lower
o = b.last
b.add(o=o, h=o + 2, l=o - 21, c=o - 20)                             # 20 STAR 1: long bearish
c1 = b.candles[-1]
b.add(o=c1["c"], h=c1["c"] + 3, l=c1["c"] - 6, c=c1["c"] + 1)        # 21 STAR 2: small
s2 = b.candles[-1]
c3c = round(c1["c"] + 0.65 * (c1["o"] - c1["c"]), 2)
b.add(o=s2["c"], h=c3c + 1, l=s2["c"] - 1, c=c3c)                    # 22 STAR 3: bullish, 65% into candle 1
c3 = b.candles[-1]
entry = c3["c"]
stop = round(s2["l"] - 3, 2)
target = round(entry + 2 * (entry - stop), 2)
ma_now = sma([k["c"] for k in b.candles], 10)[-1]
assert ma_now > entry and (ma_now - entry) / (entry - stop) < 1.2, (ma_now, entry, stop)
c = c3["c"]
b.add(o=c, h=round(ma_now + 1.5, 2), l=c - 2, c=round(ma_now - 3, 2))      # 23 rallies into the falling SMA
c = b.last
b.add(o=c, h=c + 1, l=c - 14, c=c - 12)                                    # 24 rejected
b.walk([-10, -9, 3, -12], wick=(0.15, 0.4))                                # 25-28 through the stop
closes = [k["c"] for k in b.candles]
ma = sma(closes, 10)
print("c1", c1, "star", s2, "c3", c3, "entry", entry, "stop", stop, "target", target, "sma at entry", ma_now)

meta = base_meta(
    "morning-star-fail-01",
    {"en": "Morning Star Under a Falling 10-Period Average", "bn": "নিম্নমুখী 10-period average-এর নিচে morning star"},
    "XAUUSD", "D1", "bullish", "loss",
    ["morning-star", "candlestick", "three-candle", "fail", "moving-average", "pattern"],
    {"en": "Illustrative synthetic XAUUSD D1: in a steady downtrend, a morning star forms with no support beneath it. The long at the third close rallies straight into the falling 10-day simple moving average, is rejected there, and falls through the stop.",
     "bn": "শিক্ষামূলক কাল্পনিক XAUUSD D1: একটানা downtrend-এ, নিচে কোনো support ছাড়া একটি morning star। তৃতীয় close-এর long সোজা নিম্নমুখী 10-day simple moving average পর্যন্ত ওঠে, সেখানে প্রত্যাখ্যাত হয়, তারপর stop ভেঙে নামে।"},
    {"en": "Candles 0-19 are a downtrend that slows into a grind, below its falling 10-day SMA. Candles 20-22 form a morning star, but there is no support under it, and the SMA sits only about 1R above the entry while the 2R target lies beyond it. Candle 23 rallies into the SMA, candle 24 is rejected, and the stop goes.",
     "bn": "০-১৯ নম্বর candle downtrend, শেষে ধীর গতিতে নামা, নিম্নমুখী 10-day SMA-র নিচে। ২০-২২ নম্বর morning star, কিন্তু নিচে কোনো support নেই, আর SMA entry-র মাত্র প্রায় 1R উপরে, যেখানে 2R target তার ওপারে। ২৩ নম্বর SMA পর্যন্ত ওঠে, ২৪ নম্বর প্রত্যাখ্যাত হয়, stop যায়।"},
    [
        marker(20, "1", below=False),
        marker(21, "Star"),
        marker(22, "3"),
        marker(24, "Rejected at SMA", below=False),
        hline(entry, "Entry (3rd close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A falling average just above the entry is an obstacle too", "bn": "Entry-র ঠিক উপরে নিম্নমুখী average-ও একটি বাধা"},
)
meta["overlays"] = [{"label": "SMA 10", "color": BLUE, "values": ma}]
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=22, expect="loss"))
