from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: inverted hammer at support after a decline, long on a close above its high ─────────────
P = 0.0001
b = Builder(start=1.1050, pip=P, seed=151)
b.walk([-40, -55, -30, -45])                                       # 0-3 decline
support = round(min(k["l"] for k in b.candles) - 5 * P, 4)
o = b.last
b.add(o=o, h=o + 15 * P, l=support, c=support + 40 * P)            # 4 first touch
b.walk([60, 45, -20, 55, 40])                                      # 5-9 bounce
bounce_high = round(max(k["h"] for k in b.candles[5:10]), 5)
b.walk([-45, -55, -40, -35])                                       # 10-13 back down
o = b.last
b.add(o=o, h=o + 8 * P, l=support + 6 * P, c=support + 12 * P)      # 14 into support
o = b.last
ih_idx = b.add(o=o, h=o + 50 * P, l=o - 6 * P, c=o + 10 * P)        # 15 INVERTED HAMMER
ih = b.candles[ih_idx]
c14 = round(ih["h"] + 8 * P, 5)
b.add(o=ih["c"], h=c14 + 6 * P, l=ih["c"] - 4 * P, c=c14)          # 16 confirmation: closes above the IH high
entry = c14
stop = round(ih["l"] - 10 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
b.walk([30, -15, 40, 35, -10, 45, 30, 25, 20], wick=(0.15, 0.4))     # 17-25 rally
print("inverted hammer", ih, "support", support, "entry", entry, "stop", stop, "target", target,
      "bounce high", bounce_high, "room R", round((bounce_high - entry) / (entry - stop), 2))

meta = base_meta(
    "inverted-hammer-win-01",
    {"en": "Inverted Hammer at Support, Long on a Close Above Its High", "bn": "Support-এ inverted hammer, high-এর উপরে close-এ long"},
    "EURUSD", "D1", "bullish", "win",
    ["inverted-hammer", "candlestick", "support", "confirmation", "pattern"],
    {"en": "Illustrative synthetic EURUSD D1: price falls back to a support that held once and prints an inverted hammer. The next candle closes above the inverted hammer high; the long is taken on that close. Price rallies to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক EURUSD D1: দাম আগে একবার ধরে রাখা support-এ ফিরে একটি inverted hammer দেয়। পরের candle inverted hammer-এর high-এর উপরে close করে; সেই close-এ long। দাম 2R পর্যন্ত ওঠে।"},
    {"en": "Candle 4 marks support. Candles 10-14 fall back to it. Candle 15 is an inverted hammer: small body at the bottom, upper wick about five times the body, almost no lower wick. Candle 16 closes above its high, the confirmation. Long on that close, stop under the inverted hammer low; price reaches 2R.",
     "bn": "৪ নম্বর candle support চিহ্নিত করে। ১০-১৪ নম্বর আবার সেখানে নামে। ১৫ নম্বর inverted hammer: নিচে ছোট body, উপরের wick body-র প্রায় পাঁচ গুণ, নিচে wick প্রায় নেই। ১৬ নম্বর তার high-এর উপরে close করে, এটাই confirmation। সেই close-এ long, stop inverted hammer-এর low-এর নিচে; দাম 2R পর্যন্ত যায়।"},
    [
        hline(support, "Support", BLUE),
        marker(4, "1st touch"),
        marker(15, "Inverted hammer"),
        marker(16, "Close above high"),
        hline(entry, "Entry (confirming close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "The upper wick shows buyers tried; the next close shows they won", "bn": "উপরের wick দেখায় buyers চেষ্টা করেছে; পরের close দেখায় তারা জিতেছে"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=16, expect="win"))

# ───────────── FAIL: inverted hammer mid-downtrend, bought on a half confirmation ─────────────
P = 0.0001
b = Builder(start=1.2900, pip=P, seed=157)
b.walk([-25, -30, 10, -35, -28, 8, -32, -26], wick=(0.15, 0.4))     # 0-7 steady downtrend, lower highs
o = b.last
ih_idx = b.add(o=o, h=o + 34 * P, l=o - 3 * P, c=o + 6 * P)          # 8 INVERTED HAMMER, no level
ih = b.candles[ih_idx]
c9 = round(ih["c"] + 10 * P, 5)                                     # closes above the body but far below the high
b.add(o=ih["c"], h=c9 + 4 * P, l=ih["c"] - 2 * P, c=c9)              # 9 half confirmation
entry = c9
stop = round(ih["l"] - 6 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
b.walk([-22, -30, 6, -28], wick=(0.15, 0.4))                         # 10-13 downtrend resumes
print("inverted hammer", ih, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "inverted-hammer-fail-01",
    {"en": "Inverted Hammer Mid-Downtrend, Bought on a Half Confirmation", "bn": "Downtrend-এর মাঝে inverted hammer, আধা confirmation-এ buy"},
    "GBPUSD", "H4", "bullish", "loss",
    ["inverted-hammer", "candlestick", "fail", "location", "confirmation", "pattern"],
    {"en": "Illustrative synthetic GBPUSD H4: an inverted hammer forms in the middle of a steady downtrend with no support. The next candle closes above its body but well below its high; the long taken there is stopped out as the downtrend resumes.",
     "bn": "শিক্ষামূলক কাল্পনিক GBPUSD H4: কোনো support ছাড়া একটানা downtrend-এর মাঝে একটি inverted hammer। পরের candle তার body-র উপরে কিন্তু high-এর অনেক নিচে close করে; সেখানে নেওয়া long-এর stop হয়, downtrend আবার চলে।"},
    {"en": "Candles 0-7 are a steady downtrend of lower highs. Candle 8 has the inverted hammer shape, but no support lies under it, and its upper wick stops under the last lower high. Candle 9 closes above the body yet far below the high: only half a confirmation. The long entered there is stopped out by candle 10.",
     "bn": "০-৭ নম্বর candle একটানা downtrend, lower high-এর সারি। ৮ নম্বরের আকার inverted hammer, কিন্তু নিচে কোনো support নেই, আর উপরের wick শেষ lower high-এর নিচে থেমেছে। ৯ নম্বর body-র উপরে কিন্তু high-এর অনেক নিচে close করে: আধা confirmation। সেখানে নেওয়া long ১০ নম্বরে stop হয়।"},
    [
        marker(8, "Inverted hammer (no level)"),
        marker(9, "Half confirmation"),
        hline(entry, "Entry", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Mid-downtrend, an upper wick is sellers rejecting higher prices", "bn": "Downtrend-এর মাঝে উপরের wick মানে sellers উপরের দাম ফিরিয়ে দিয়েছে"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=9, expect="loss"))
