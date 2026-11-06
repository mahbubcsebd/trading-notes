from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: bullish outside bar sweeps below support, closes near its high ─────────────
P = 0.01
b = Builder(start=152.40, pip=P, seed=371, decimals=3)
b.walk([-15, -20, -12, -18])                                      # 0-3 decline
support = round(min(k["l"] for k in b.candles) - 3 * P, 3)
o = b.last
b.add(o=o, h=o + 6 * P, l=support, c=support + 14 * P)            # 4 first touch
b.walk([22, 26, -8, 24, 18])                                      # 5-9 bounce
swing_high = round(max(k["h"] for k in b.candles[5:10]), 3)
b.walk([-18, -22, -16])                                           # 10-12 back down
o = b.last
b.add(o=o, h=o + 3 * P, l=min(o, support + 12 * P) - 3 * P, c=support + 12 * P)   # 13 into support
b.add(o=support + 12 * P, h=support + 14 * P, l=support + 5 * P, c=support + 6 * P)   # 14 small bearish
pv = b.candles[-1]
ob_idx = b.add(o=pv["c"], h=support + 18 * P, l=support - 10 * P, c=support + 16 * P)   # 15 BULLISH OUTSIDE BAR
ob = b.candles[ob_idx]
assert ob["h"] > pv["h"] and ob["l"] < pv["l"]
entry = round(ob["h"] + 2 * P, 3)
stop = round(ob["l"] - 4 * P, 3)
target = round(entry + 2 * (entry - stop), 3)
b.add(o=ob["c"], h=entry + 10 * P, l=ob["c"] - 3 * P, c=entry + 7 * P)   # 16 breaks the outside bar high
b.walk([18, -6, 22, 16, -8, 20, 14], wick=(0.15, 0.4))                  # 17-23 rally
print("prev", pv, "outside", ob, "entry", entry, "stop", stop, "target", target,
      "swing", swing_high, "room R", round((swing_high - entry) / (entry - stop), 2))

meta = base_meta(
    "outside-bar-win-01",
    {"en": "Bullish Outside Bar Sweeps Support, High Break Entry", "bn": "Support-এর নিচে ঘুরে আসা bullish outside bar, high ভাঙলে entry"},
    "USDJPY", "H4", "bullish", "win",
    ["outside-bar", "price-action", "reversal", "support", "pattern"],
    {"en": "Illustrative synthetic USDJPY H4: on the second test of support, a candle trades below the previous low and the support, then above the previous high, and closes near its own high: a bullish outside bar. A buy stop above it fills and price rallies to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক USDJPY H4: support-এর দ্বিতীয় পরীক্ষায় একটি candle আগের low আর support-এর নিচে নামে, তারপর আগের high-এর উপরে ওঠে, আর নিজের high-এর কাছে close করে: bullish outside bar। তার উপরে buy stop fill হয়, দাম 2R পর্যন্ত যায়।"},
    {"en": "Candle 4 marks support. Candles 10-14 fall back to it. Candle 15 takes out candle 14's low (and support), then its high, and closes in the top fifth of its range. Stops below support were swept and the whole range was reclaimed. Candle 16 breaks the outside bar high and fills the buy stop.",
     "bn": "৪ নম্বর candle support চিহ্নিত করে। ১০-১৪ নম্বর আবার সেখানে নামে। ১৫ নম্বর ১৪ নম্বরের low (আর support) ভাঙে, তারপর high-ও, আর নিজের range-এর উপরের এক-পঞ্চমাংশে close করে। Support-এর নিচের stop sweep হয়ে পুরো range ফিরে এসেছে। ১৬ নম্বর outside bar-এর high ভেঙে buy stop fill করে।"},
    [
        hline(support, "Support", BLUE),
        marker(4, "1st touch"),
        marker(15, "Outside bar"),
        hline(entry, "Entry (high break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "An outside bar means most when it sweeps a level and closes at the far extreme", "bn": "Level sweep করে উল্টো প্রান্তে close করলেই outside bar সবচেয়ে অর্থবহ"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=16, expect="win"))

# ───────────── FAIL: outside bar with a mid-range close in a choppy market ─────────────
P = 0.0001
b = Builder(start=1.0800, pip=P, seed=373)
b.walk([35, -40, 30, -35, 40, -30, 25, -28], wick=(0.3, 0.6))     # 0-7 wide choppy range
o = b.last
b.add(o=o, h=o + 18 * P, l=o - 20 * P, c=o - 6 * P)                  # 8 previous bar
pv = b.candles[-1]
ob_idx = b.add(o=pv["c"], h=pv["h"] + 30 * P, l=pv["l"] - 28 * P, c=pv["c"] + 8 * P)   # 9 OUTSIDE BAR, close mid-range
ob = b.candles[ob_idx]
assert ob["h"] > pv["h"] and ob["l"] < pv["l"]
entry = round(ob["h"] + 3 * P, 5)
stop = round(ob["l"] - 6 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
b.add(o=ob["c"], h=entry + 8 * P, l=ob["c"] - 10 * P, c=ob["c"] + 4 * P)    # 10 fills on a spike, closes back mid
c = b.last
b.add(o=c, h=c + 6 * P, l=c - 40 * P, c=c - 35 * P)                        # 11 swings down
b.walk([-35, -25, 10, -30], wick=(0.3, 0.6))                                # 12-15 breaks the outside bar low
close_pos = round((ob["c"] - ob["l"]) / (ob["h"] - ob["l"]), 2)
print("prev", pv, "outside", ob, "entry", entry, "stop", stop, "target", target, "close position", close_pos)

meta = base_meta(
    "outside-bar-fail-01",
    {"en": "Outside Bar With a Mid-Range Close in a Choppy Market", "bn": "এলোমেলো বাজারে মাঝখানে close করা outside bar"},
    "EURUSD", "D1", "bullish", "loss",
    ["outside-bar", "price-action", "fail", "chop", "pattern"],
    {"en": "Illustrative synthetic EURUSD D1: in a wide, choppy range, a candle takes out both the previous high and low but closes near the middle of its own range. Bought on the high break, the trade is caught in two-sided volatility and stopped out below the outside bar low.",
     "bn": "শিক্ষামূলক কাল্পনিক EURUSD D1: চওড়া, এলোমেলো range-এ একটি candle আগের high আর low দুটোই ভাঙে, কিন্তু নিজের range-এর মাঝখানে close করে। High ভাঙলে buy, দুই দিকের volatility-তে আটকে outside bar-এর low-এর নিচে stop।"},
    {"en": "Candles 0-7 swing up and down in a wide range with no trend. Candle 9 covers candle 8's whole range, but closes only a little above the middle of its own range: both sides were active and neither won. Candle 10 spikes above the high, fills the buy stop and closes back in the middle. The range swings down and breaks the outside bar low.",
     "bn": "০-৭ নম্বর candle কোনো trend ছাড়া চওড়া range-এ ওঠানামা করে। ৯ নম্বর ৮ নম্বরের পুরো range ঢাকে, কিন্তু নিজের range-এর মাঝের সামান্য উপরে close করে: দুই পক্ষই সক্রিয়, কেউ জেতেনি। ১০ নম্বর high-এর উপরে spike দিয়ে buy stop fill করে, আবার মাঝখানে close করে। Range নিচে ঘুরে outside bar-এর low ভাঙে।"},
    [
        marker(8, "Previous bar", below=False),
        marker(9, "Outside bar (mid close)"),
        hline(entry, "Entry (high break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "An outside bar that closes in the middle shows two-sided volatility, not a winner", "bn": "মাঝখানে close করা outside bar দুই দিকের volatility দেখায়, বিজয়ী নয়"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=10, expect="loss"))
