from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: long-legged doji on a pullback to broken resistance (uptrend), long on high break ─────────────
P = 0.01
b = Builder(start=149.20, pip=P, seed=101, decimals=3)
b.walk([10, -8, 12, -6, 9, -10, 8])                               # 0-6 range under a ceiling
ceiling = round(max(k["h"] for k in b.candles) + 2 * P, 3)
o = b.last
b.add(o=o, h=ceiling + 32 * P, l=o - 3 * P, c=ceiling + 28 * P)   # 7 breakout candle
b.walk([30, 28, -8, 30, 26])                                      # 8-12 move up
swing_high = round(max(k["h"] for k in b.candles), 3)
b.walk([-30, -35, -30])                                           # 13-15 pullback
o = b.last
assert o > ceiling + 20 * P, o
b.add(o=o, h=o + 4 * P, l=ceiling + 4 * P, c=ceiling + 8 * P)      # 16 lands on old ceiling
o = b.last
ll_idx = b.add(o=o, h=o + 28 * P, l=o - 28 * P, c=o + 1 * P)        # 17 LONG-LEGGED DOJI
ll = b.candles[ll_idx]
entry = round(ll["h"] + 2 * P, 3)
stop = round(ll["l"] - 4 * P, 3)
target = round(swing_high - 3 * P, 3)                             # just before the swing high
assert (target - entry) / (entry - stop) >= 1.5
b.add(o=ll["c"], h=entry + 8 * P, l=ll["c"] - 4 * P, c=entry + 5 * P)   # 18 closes above the doji high
b.walk([18, -8, 24, 16, -6, 22, 18, 14], wick=(0.15, 0.4))             # 19-26 trend resumes
print("long-legged", ll, "ceiling", ceiling, "entry", entry, "stop", stop, "target", target,
      "swing high", swing_high, "room R", round((swing_high - entry) / (entry - stop), 2))

meta = base_meta(
    "long-legged-doji-win-01",
    {"en": "Long-Legged Doji on a Retest of Broken Resistance", "bn": "ভাঙা resistance-এর retest-এ long-legged doji"},
    "USDJPY", "H4", "bullish", "win",
    ["long-legged-doji", "doji", "candlestick", "retest", "trend", "pattern"],
    {"en": "Illustrative synthetic USDJPY H4: price breaks out of a range, pulls back to the old ceiling and prints a long-legged doji there. The next candle closes above the doji high, filling a buy stop in the trend direction. Price reaches the target under the swing high.",
     "bn": "শিক্ষামূলক কাল্পনিক USDJPY H4: দাম range ভেঙে উপরে যায়, পুরোনো ceiling-এ ফিরে সেখানে একটি long-legged doji দেয়। পরের candle doji-র high-এর উপরে close করে, trend-এর দিকে buy stop fill হয়। দাম swing high-এর নিচের target পর্যন্ত যায়।"},
    {"en": "Candles 0-6 range under a ceiling; candle 7 breaks out. Candles 13-16 pull back to the old ceiling, now support. Candle 17 is a long-legged doji: almost no body, long wicks both ways. Candle 18 closes above its high and fills the buy stop. The stop sits below the lower wick; price reaches the target just under the swing high (about 1.7R).",
     "bn": "০-৬ নম্বর candle একটি ceiling-এর নিচে range; ৭ নম্বর তা ভাঙে। ১৩-১৬ নম্বর পুরোনো ceiling-এ ফেরে, যা এখন support। ১৭ নম্বর long-legged doji: body প্রায় নেই, দুই দিকে লম্বা wick। ১৮ নম্বর তার high-এর উপরে close করে buy stop fill করে। Stop নিচের wick-এর নিচে; দাম swing high-এর নিচের target পর্যন্ত যায়।"},
    [
        hline(ceiling, "Old ceiling (now support)", BLUE),
        marker(7, "Breakout"),
        marker(17, "Long-legged doji"),
        hline(entry, "Entry (high break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target (under swing high)", GREEN),
    ],
    {"en": "Trade the break of the doji's range in the trend direction", "bn": "Trend-এর দিকে doji-র range ভাঙলে trade"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=18, expect="win"))

# ───────────── FAIL: long-legged doji on a news release candle ─────────────
P = 0.0001
b = Builder(start=1.0850, pip=P, seed=113)
b.walk([4, -3, 5, -4, 3, -5, 4, -2, -6, -4, -5], wick=(0.3, 0.6), min_wick=1)   # 0-10 quiet drift into support
support = round(min(k["l"] for k in b.candles) - 1 * P, 4)
o = b.last
nf_idx = b.add(o=o, h=o + 48 * P, l=o - 45 * P, c=o + 2 * P)       # 11 LONG-LEGGED DOJI on news
nf = b.candles[nf_idx]
entry = round(nf["h"] + 2 * P, 5)
stop = round(nf["l"] - 4 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
b.add(o=nf["c"], h=entry + 6 * P, l=nf["c"] - 20 * P, c=nf["c"] - 15 * P)   # 12 spikes above, closes lower
b.walk([-30, -35, 8, -25], wick=(0.15, 0.4))                                 # 13-16 falls through the stop
print("long-legged", nf, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "long-legged-doji-fail-01",
    {"en": "Long-Legged Doji on a News Release", "bn": "News release-এর candle-এ long-legged doji"},
    "EURUSD", "H1", "bullish", "loss",
    ["long-legged-doji", "doji", "candlestick", "fail", "news", "pattern"],
    {"en": "Illustrative synthetic EURUSD H1: after quiet candles, a data release prints a long-legged doji near support. A buy stop above its high fills on the next spike, which closes lower; price then breaks the doji low.",
     "bn": "শিক্ষামূলক কাল্পনিক EURUSD H1: শান্ত candle-এর পর একটি data release support-এর কাছে long-legged doji দেয়। পরের spike-এ তার high-এর উপরের buy stop fill হয়, কিন্তু candle নিচে close করে; এরপর দাম doji-র low ভাঙে।"},
    {"en": "Candles 0-10 drift quietly in a few pips. Candle 11 is the news candle: almost no body, about 45 pips of wick each way. Its shape is a long-legged doji, but it is a product of thin liquidity at the release, not a battle at a level. Candle 12 fills the buy stop and closes lower; candle 14 breaks the stop.",
     "bn": "০-১০ নম্বর candle কয়েক pip-এর মধ্যে শান্তভাবে চলে। ১১ নম্বর news candle: body প্রায় নেই, দুই দিকে প্রায় 45 pip wick। আকারে long-legged doji, কিন্তু এটা release-এর মুহূর্তের পাতলা liquidity-র ফল, level-এর লড়াই নয়। ১২ নম্বর buy stop fill করে নিচে close করে; ১৪ নম্বর stop ভাঙে।"},
    [
        hline(support, "Support", BLUE),
        marker(11, "News candle", below=False),
        marker(12, "Spike fills, closes lower", below=False),
        hline(entry, "Entry (high break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A news candle's wicks are noise, not a signal", "bn": "News candle-এর wick noise, signal নয়"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=12, expect="loss"))
