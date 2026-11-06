from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: dragonfly doji sweeps below support, long on confirmation ─────────────
P = 0.0001
b = Builder(start=1.0980, pip=P, seed=71)
b.walk([-18, -22, -15, -25, -12])                                 # 0-4 decline
support = round(min(k["l"] for k in b.candles) - 3 * P, 4)
o = b.last
b.add(o=o, h=o + 8 * P, l=support, c=support + 14 * P)            # 5 first touch
b.walk([20, 26, 14, -8, 18])                                      # 6-10 bounce
bounce_high = round(max(k["h"] for k in b.candles[6:11]), 5)
b.walk([-14, -20, -12, -18])                                      # 11-14 back down
o = b.last
b.add(o=o, h=o + 4 * P, l=support + 3 * P, c=support + 6 * P)      # 15 arrives above support
o = b.last
df_idx = b.add(o=o, h=o + 1 * P, l=support - 22 * P, c=o + 0.5 * P)   # 16 DRAGONFLY DOJI
df = b.candles[df_idx]
entry = round(df["h"] + 2 * P, 5)
stop = round(df["l"] - 5 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
b.add(o=df["c"], h=entry + 12 * P, l=df["c"] - 3 * P, c=entry + 9 * P)   # 17 bullish confirmation
b.walk([16, -6, 20, 14, -8, 22, 12, 18], wick=(0.15, 0.4))              # 18-25 rally
print("dragonfly", df, "support", support, "entry", entry, "stop", stop, "target", target,
      "bounce high", bounce_high, "room R", round((bounce_high - entry) / (entry - stop), 2))

meta = base_meta(
    "dragonfly-doji-win-01",
    {"en": "Dragonfly Doji Sweeps Below Support, Long on Confirmation", "bn": "Support-এর নিচে ঘুরে আসা dragonfly doji, confirmation-এর পর long"},
    "EURUSD", "H4", "bullish", "win",
    ["dragonfly-doji", "doji", "candlestick", "support", "pattern"],
    {"en": "Illustrative synthetic EURUSD H4: on the second test of support, a dragonfly doji dips well below the level and closes back at its open and high. The next candle closes above it, filling a buy stop. Price reaches 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক EURUSD H4: support-এর দ্বিতীয় পরীক্ষায় একটি dragonfly doji level-এর অনেক নিচে নেমে আবার নিজের open ও high-এ close করে। পরের candle তার উপরে close করে buy stop fill করে। দাম 2R পর্যন্ত যায়।"},
    {"en": "Candle 5 marks support. Candles 11-15 fall back to it. Candle 16 is a dragonfly doji: open, high and close almost equal, a long lower wick through support. Candle 17 closes above its high and fills the buy stop. The stop sits under the wick low; price reaches 2R.",
     "bn": "৫ নম্বর candle support চিহ্নিত করে। ১১-১৫ নম্বর আবার সেখানে নামে। ১৬ নম্বর dragonfly doji: open, high আর close প্রায় সমান, support ভেদ করে লম্বা নিচের wick। ১৭ নম্বর তার high-এর উপরে close করে buy stop fill করে। Stop wick-এর low-এর নিচে; দাম 2R পর্যন্ত যায়।"},
    [
        hline(support, "Support", BLUE),
        marker(5, "1st touch"),
        marker(16, "Dragonfly doji"),
        hline(entry, "Entry (high break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "The long lower wick is the story; the next close confirms it", "bn": "লম্বা নিচের wick-ই গল্প; পরের close তা নিশ্চিত করে"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=17, expect="win"))

# ───────────── FAIL: dragonfly doji at the top of a rally, bought as "bullish" ─────────────
P = 0.01
b = Builder(start=148.00, pip=P, seed=83, decimals=3)
b.walk([45, 60, -20, 55, 40, -25, 50, 65, 35])                    # 0-8 strong rally
o = b.last
df_idx = b.add(o=o, h=o + 3 * P, l=o - 70 * P, c=o + 1 * P)        # 9 DRAGONFLY at the top
df = b.candles[df_idx]
entry = round(df["h"] + 4 * P, 3)
stop = round(df["l"] - 10 * P, 3)
target = round(entry + 2 * (entry - stop), 3)
b.add(o=df["c"], h=entry + 12 * P, l=df["c"] - 30 * P, c=df["c"] - 22 * P)   # 10 pokes above, closes red
b.walk([-55, -40, 15, -60], wick=(0.15, 0.4))                                # 11-14 decline through stop
print("dragonfly", df, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "dragonfly-doji-fail-01",
    {"en": "Dragonfly Doji at the Top of a Rally", "bn": "Rally-র চূড়ায় dragonfly doji"},
    "USDJPY", "D1", "bullish", "loss",
    ["dragonfly-doji", "doji", "candlestick", "fail", "location", "pattern"],
    {"en": "Illustrative synthetic USDJPY D1: after nine days of rally, a dragonfly doji prints at the high. A buy stop above it fills when the next candle pokes higher, but that candle closes red and the decline breaks the wick low.",
     "bn": "শিক্ষামূলক কাল্পনিক USDJPY D1: নয় দিনের rally-র পর চূড়ায় একটি dragonfly doji। পরের candle উপরে উঁকি দিলে buy stop fill হয়, কিন্তু সেই candle লাল close করে আর পতন wick-এর low ভেঙে দেয়।"},
    {"en": "Candles 0-8 rally hard. Candle 9 has the dragonfly shape, but it sits at the top of a run, not at support: the long lower wick shows sellers were already able to drive price far down. Candle 10 fills the buy stop and closes lower. Candle 11 hits the stop.",
     "bn": "০-৮ নম্বর candle জোরে ওঠে। ৯ নম্বরের আকার dragonfly, কিন্তু এটা support-এ নয়, দৌড়ের চূড়ায়: লম্বা নিচের wick দেখায় sellers ইতিমধ্যে দাম অনেক নিচে নামাতে পেরেছে। ১০ নম্বর buy stop fill করে নিচে close করে। ১১ নম্বর stop ছোঁয়।"},
    [
        marker(9, "Dragonfly at the top", below=False),
        marker(10, "Red close", below=False),
        hline(entry, "Entry (high break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "The same shape at a top is a warning, not a buy signal", "bn": "চূড়ায় একই আকার সতর্কসংকেত, buy signal নয়"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=10, expect="loss"))
