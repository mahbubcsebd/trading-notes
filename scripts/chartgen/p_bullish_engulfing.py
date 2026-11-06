from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: bullish engulfing at broken resistance (uptrend pullback), 50% body retest ─────────────
P = 0.0001
b = Builder(start=1.2600, pip=P, seed=191)
b.walk([8, -6, 10, -7, 6, -9, 7])                                   # 0-6 range under a ceiling
ceiling = round(max(k["h"] for k in b.candles) + 2 * P, 4)
o = b.last
b.add(o=o, h=ceiling + 26 * P, l=o - 2 * P, c=ceiling + 22 * P)     # 7 breakout
b.walk([14, 10, -4, 16, 12])                                        # 8-12 move up
swing_high = round(max(k["h"] for k in b.candles), 5)
b.walk([-12, -15, -10])                                             # 13-15 pullback
o = b.last
b.add(o=o, h=o + 3 * P, l=ceiling + 3 * P, c=ceiling + 6 * P)        # 16 into old ceiling
o = b.last
b.add(o=o, h=o + 2 * P, l=o - 16 * P, c=o - 13 * P)                  # 17 bearish candle (body 13)
c1 = b.candles[-1]
o2 = c1["c"]
be_idx = b.add(o=o2, h=c1["o"] + 20 * P, l=o2 - 4 * P, c=c1["o"] + 17 * P)   # 18 BULLISH ENGULFING (body 30)
be = b.candles[be_idx]
entry = round((be["o"] + be["c"]) / 2, 5)
stop = round(be["l"] - 4 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
c = be["c"]
b.add(o=c, h=c + 5 * P, l=entry + 3 * P, c=entry + 6 * P)            # 19 drifts back
c = b.last
b.add(o=c, h=c + 3 * P, l=entry - 2 * P, c=entry + 8 * P)            # 20 fills the 50% limit
b.walk([14, -5, 16, 12, -6, 15, 10], wick=(0.15, 0.4))               # 21-27 trend resumes
print("engulfing", c1, be, "entry", entry, "stop", stop, "target", target, "swing", swing_high,
      "room R", round((swing_high - entry) / (entry - stop), 2))

meta = base_meta(
    "bullish-engulfing-win-01",
    {"en": "Bullish Engulfing at Broken Resistance, 50% Body Retest", "bn": "ভাঙা resistance-এ bullish engulfing, body-র 50% retest-এ entry"},
    "GBPUSD", "H1", "bullish", "win",
    ["bullish-engulfing", "engulfing", "candlestick", "retest", "trend", "pattern"],
    {"en": "Illustrative synthetic GBPUSD H1: after a range breakout, price pulls back to the old ceiling and prints a bullish engulfing there. A buy limit at 50% of the engulfing body fills two candles later and price rallies to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক GBPUSD H1: range breakout-এর পর দাম পুরোনো ceiling-এ ফিরে সেখানে একটি bullish engulfing দেয়। Engulfing body-র 50%-এ buy limit দুই candle পরে fill হয়, দাম 2R পর্যন্ত ওঠে।"},
    {"en": "Candles 0-6 range; candle 7 breaks out. Candles 13-17 pull back to the old ceiling, now support; candle 17 is a clear bearish candle. Candle 18's body engulfs it completely, about 2.3× its size, closing near the high. The buy limit at 50% of that body fills on candle 20; the stop sits under the engulfing low.",
     "bn": "০-৬ নম্বর candle range; ৭ নম্বর তা ভাঙে। ১৩-১৭ নম্বর পুরোনো ceiling-এ ফেরে, যা এখন support; ১৭ নম্বর একটি স্পষ্ট bearish candle। ১৮ নম্বরের body সেটাকে পুরো ঢেকে দেয়, আকারে প্রায় ২.৩ গুণ, close high-এর কাছে। সেই body-র 50%-এর buy limit ২০ নম্বরে fill হয়; stop engulfing-এর low-এর নিচে।"},
    [
        hline(ceiling, "Old ceiling (now support)", BLUE),
        marker(18, "Bullish engulfing"),
        marker(20, "50% retest"),
        hline(entry, "Entry (50% body)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Trend, level, quality, then a patient entry", "bn": "Trend, level, মান, তারপর ধৈর্যের entry"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=20, expect="win"))

# ───────────── FAIL: weak engulfing of a tiny candle with a long upper wick ─────────────
P = 0.0001
b = Builder(start=1.0950, pip=P, seed=197)
b.walk([-20, -25, 8, -22, -18, 6, -24, -20], wick=(0.15, 0.4))      # 0-7 downtrend
support = round(min(k["l"] for k in b.candles) - 4 * P, 4)
o = b.last
b.add(o=o, h=o + 3 * P, l=support + 2 * P, c=o - 2 * P)              # 8 tiny candle (body 2)
c1 = b.candles[-1]
be_idx = b.add(o=c1["c"], h=c1["o"] + 24 * P, l=c1["c"] - 3 * P, c=c1["o"] + 5 * P)   # 9 weak engulfing: long upper wick
be = b.candles[be_idx]
entry = be["c"]                                                      # close entry
stop = round(be["l"] - 4 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
b.add(o=be["c"], h=be["c"] + 4 * P, l=be["c"] - 9 * P, c=be["c"] - 7 * P)    # 10 no follow-through
b.walk([-16, -22, 5, -20], wick=(0.15, 0.4))                                  # 11-14 support breaks
print("weak engulfing", c1, be, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "bullish-engulfing-fail-01",
    {"en": "Weak Bullish Engulfing of a Tiny Candle", "bn": "ছোট্ট candle-কে ঢাকা দুর্বল bullish engulfing"},
    "EURUSD", "H4", "bullish", "loss",
    ["bullish-engulfing", "engulfing", "candlestick", "fail", "quality", "pattern"],
    {"en": "Illustrative synthetic EURUSD H4: at the end of a downtrend a green candle engulfs a tiny candle, but closes far below its own high after a long upper wick. Bought at the close, it fails as support breaks.",
     "bn": "শিক্ষামূলক কাল্পনিক EURUSD H4: downtrend-এর শেষে একটি সবুজ candle একটি ছোট্ট candle-কে ঢাকে, কিন্তু লম্বা upper wick রেখে নিজের high-এর অনেক নিচে close করে। Close-এ buy, support ভাঙলে stop।"},
    {"en": "Candle 8 is a tiny candle with a 2-pip body: easy to engulf. Candle 9 technically engulfs it, but its close sits in the lower third of its range under a long upper wick. Two of the three quality questions fail. Bought at the close, the trade gets no follow-through and the stop goes with the support.",
     "bn": "৮ নম্বর ছোট্ট candle, body মাত্র 2 pip: ঢাকা সহজ। ৯ নম্বর নিয়মমতো ঢাকে, কিন্তু close নিজের range-এর নিচের এক-তৃতীয়াংশে, উপরে লম্বা wick। মানের তিন প্রশ্নের দুটিই ব্যর্থ। Close-এ buy, পরে কোনো follow-through নেই, support-এর সঙ্গে stop-ও যায়।"},
    [
        hline(support, "Support", BLUE),
        marker(8, "Tiny candle"),
        marker(9, "Weak engulfing"),
        hline(entry, "Entry (close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Engulfing a tiny candle proves little; check the three quality questions", "bn": "ছোট্ট candle ঢাকা কম প্রমাণ; মানের তিন প্রশ্ন যাচাই করুন"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=9, expect="loss"))
