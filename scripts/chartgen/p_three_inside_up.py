from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: three inside up at a tested support, entry at the third close ─────────────
D = 1.0
b = Builder(start=2360.0, pip=D, seed=471, decimals=2)
b.walk([-5, -7, -4, -6])                                          # 0-3 decline
support = round(min(k["l"] for k in b.candles) - 1.5, 2)
o = b.last
b.add(o=o, h=o + 2, l=support, c=support + 4)                     # 4 first touch
b.walk([10, 12, -3, 12, 10, 6])                                   # 5-10 bounce
swing_high = round(max(k["h"] for k in b.candles[5:11]), 2)
b.walk([-9, -11, -8, -6])                                         # 11-14 back down
o = b.last
b.add(o=o, h=o + 1.5, l=min(o, support + 12) - 1, c=support + 12)  # 15 near support
o = b.last
b.add(o=o, h=o + 1, l=support + 0.5, c=support + 1.5)              # 16 MOTHER: long bearish
mo = b.candles[-1]
body = mo["o"] - mo["c"]
b.add(o=mo["c"], h=mo["c"] + 0.45 * body + 0.5, l=mo["c"] - 0.6, c=round(mo["c"] + 0.45 * body, 2))   # 17 HARAMI
hb = b.candles[-1]
c3c = round(mo["o"] + 2.5, 2)
b.add(o=hb["c"], h=c3c + 0.8, l=hb["c"] - 0.5, c=c3c)               # 18 THIRD: closes above the mother's open
c3 = b.candles[-1]
entry = c3["c"]
stop = round(min(mo["l"], hb["l"]) - 1.5, 2)
target = round(entry + 2 * (entry - stop), 2)
b.add(o=c3["c"], h=c3["c"] + 2, l=c3["c"] - 2.5, c=c3["c"] + 1)     # 19
b.walk([6, -2, 7, 5, -2, 6, 5, 4, 3], wick=(0.15, 0.4))             # 20-28 rally
print("mother", mo, "harami", hb, "third", c3, "entry", entry, "stop", stop, "target", target,
      "swing", swing_high, "room R", round((swing_high - entry) / (entry - stop), 2))

meta = base_meta(
    "three-inside-up-win-01",
    {"en": "Three Inside Up at Tested Support, Entry at the Third Close", "bn": "পরীক্ষিত support-এ three inside up, তৃতীয় close-এ entry"},
    "XAUUSD", "H1", "bullish", "win",
    ["three-inside-up", "harami", "candlestick", "three-candle", "support", "pattern"],
    {"en": "Illustrative synthetic XAUUSD H1: a long bearish candle into a support that held once, a small harami inside it, then a third candle that closes above the first candle's open. Long at the third close, stop under the mother's low; price reaches 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক XAUUSD H1: আগে একবার ধরে রাখা support-এ একটি লম্বা bearish candle, তার ভেতরে ছোট harami, তারপর তৃতীয় candle প্রথমটার open-এর উপরে close করে। তৃতীয় close-এ long, stop mother-এর low-এর নিচে; দাম 2R পর্যন্ত যায়।"},
    {"en": "Candle 4 marks support. Candle 16 is a long bearish mother into it; candle 17 is a small bullish harami inside its body. Candle 18 closes above candle 16's open: the harami has been confirmed, forming three inside up. Long at that close, stop under the mother's low.",
     "bn": "৪ নম্বর candle support চিহ্নিত করে। ১৬ নম্বর সেখানে লম্বা bearish mother; ১৭ নম্বর তার body-র ভেতরে ছোট bullish harami। ১৮ নম্বর ১৬ নম্বরের open-এর উপরে close করে: harami নিশ্চিত হলো, three inside up। সেই close-এ long, stop mother-এর low-এর নিচে।"},
    [
        hline(support, "Support", BLUE),
        marker(16, "Mother", below=False),
        marker(17, "Harami"),
        marker(18, "Close above mother open"),
        hline(entry, "Entry (3rd close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Three inside up is a harami that has already been confirmed", "bn": "Three inside up হলো ইতিমধ্যে নিশ্চিত হওয়া harami"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=18, expect="win"))

# ───────────── FAIL: three inside up on H4, straight under a daily supply zone ─────────────
P = 0.0001
b = Builder(start=1.2800, pip=P, seed=479)
b.walk([30, 25, -8, 28, 20])                                       # 0-4 rally into a daily supply zone
zone_lo = round(max(k["h"] for k in b.candles) - 6 * P, 5)
zone_hi = round(zone_lo + 30 * P, 5)
o = b.last
b.add(o=o, h=zone_lo + 4 * P, l=o - 20 * P, c=o - 16 * P)          # 5 rejected at the zone
b.walk([-15, -18, -10])                                           # 6-8 drop
o = b.last
b.add(o=o, h=o + 3 * P, l=o - 30 * P, c=o - 28 * P)                # 9 MOTHER: long bearish
mo = b.candles[-1]
body = mo["o"] - mo["c"]
b.add(o=mo["c"], h=round(mo["c"] + 0.45 * body + 2 * P, 5), l=mo["c"] - 3 * P, c=round(mo["c"] + 0.45 * body, 5))   # 10 HARAMI
hb = b.candles[-1]
c3c = round(mo["o"] + 4 * P, 5)
b.add(o=hb["c"], h=c3c + 2 * P, l=hb["c"] - 2 * P, c=c3c)            # 11 THIRD: closes above the mother's open
c3 = b.candles[-1]
entry = c3["c"]
stop = round(min(mo["l"], hb["l"]) - 5 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
room = round((zone_lo - entry) / (entry - stop), 2)
c = c3["c"]
b.add(o=c, h=c + 22 * P, l=c - 4 * P, c=c + 18 * P)                 # 12 rally
c = b.last
b.add(o=c, h=zone_lo + 6 * P, l=c - 3 * P, c=zone_lo - 4 * P)        # 13 into the daily zone
c = b.last
b.add(o=c, h=c + 2 * P, l=c - 30 * P, c=c - 27 * P)                 # 14 rejected
b.walk([-25, -20, 5, -28], wick=(0.15, 0.4))                         # 15-18 through the stop
print("mother", mo, "harami", hb, "third", c3, "entry", entry, "stop", stop, "target", target,
      "zone", zone_lo, zone_hi, "room to zone R", room)

meta = base_meta(
    "three-inside-up-fail-01",
    {"en": "Three Inside Up Under a Daily Supply Zone", "bn": "Daily supply zone-এর নিচে three inside up"},
    "GBPUSD", "H4", "bullish", "loss",
    ["three-inside-up", "harami", "candlestick", "three-candle", "fail", "higher-timeframe", "pattern"],
    {"en": "Illustrative synthetic GBPUSD H4: a clean three inside up forms after a drop, but a daily supply zone that already rejected price sits just under 1.5R above the entry. The long rallies into the zone, is rejected again, and the stop goes.",
     "bn": "শিক্ষামূলক কাল্পনিক GBPUSD H4: পতনের পর একটি পরিষ্কার three inside up, কিন্তু একটি daily supply zone, যা আগেই দাম ফিরিয়ে দিয়েছে, entry থেকে 1.5R-এর সামান্য কম দূরে। Long zone পর্যন্ত ওঠে, আবার প্রত্যাখ্যাত হয়, stop যায়।"},
    {"en": "Candles 0-5 rally into a daily supply zone and are rejected there. After a drop, candles 9-11 form a clean three inside up on H4. But the daily zone sits just under 1.5R above the entry, and the 2R target lies inside it. Candle 13 reaches the zone, candle 14 is rejected, and price falls through the stop.",
     "bn": "০-৫ নম্বর candle একটি daily supply zone পর্যন্ত উঠে প্রত্যাখ্যাত হয়। পতনের পর ৯-১১ নম্বর H4-এ পরিষ্কার three inside up। কিন্তু daily zone entry থেকে 1.5R-এর সামান্য কম দূরে, আর 2R target তার ভেতরে। ১৩ নম্বর zone-এ পৌঁছায়, ১৪ নম্বর প্রত্যাখ্যাত হয়, দাম stop ভেঙে নামে।"},
    [
        hline(zone_hi, "Daily supply (top)", BLUE, style="dotted"),
        hline(zone_lo, "Daily supply (bottom)", BLUE),
        marker(9, "Mother", below=False),
        marker(10, "Harami"),
        marker(11, "3rd"),
        marker(14, "Rejected", below=False),
        hline(entry, "Entry (3rd close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Check the higher timeframe: a daily zone overhead caps the trade", "bn": "Higher timeframe দেখুন: মাথার উপরের daily zone trade আটকে দেয়"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=11, expect="loss"))
