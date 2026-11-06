from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: doji at a tested support after a decline, long on confirmation ─────────────
D = 1.0  # XAUUSD: 1 unit = $1
b = Builder(start=2350.0, pip=D, seed=51, decimals=2)
b.walk([-4, -6, -3, -5, -7])                                 # 0-4 decline
support = round(min(k["l"] for k in b.candles) - 1.0, 2)
b.add(o=b.last, h=b.last + 3, l=support, c=b.last + 2.5)    # 5 first touch of support
b.walk([5, 6, 4, 7, 3])                                      # 6-10 bounce
b.walk([-3, -6, -4, -5, -7, -4])                             # 11-16 back down
fill = round(support + 3.5 - b.last, 2)
assert abs(fill) < 10, fill
b.walk([fill])                                               # 17 into support
o = b.last
d_idx = b.add(o=o, h=o + 4.2, l=o - 4.6, c=o + 0.1)          # 18 DOJI
dj = b.candles[d_idx]
entry = round(dj["h"] + 0.5, 2)
stop = round(dj["l"] - 2.0, 2)
target = round(entry + 2 * (entry - stop), 2)
b.add(o=dj["c"], h=entry + 3, l=dj["c"] - 1.0, c=entry + 2.0)   # 19 bullish confirmation
b.walk([4, -2, 5, 3, -1, 6, 4, 5, 3, 4], wick=(0.15, 0.4))      # 20-29 rally
print("doji", dj, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "doji-win-01",
    {"en": "Doji at Tested Support, Long on Confirmation", "bn": "পরীক্ষিত support-এ doji, confirmation-এর পর long"},
    "XAUUSD", "H1", "bullish", "win",
    ["doji", "candlestick", "indecision", "support", "pattern"],
    {"en": "Illustrative synthetic XAUUSD H1: price falls back to a support that held once and prints a doji. The next candle closes above the doji high, filling a buy stop. Price rallies to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক XAUUSD H1: দাম আগে একবার ধরে রাখা support-এ ফিরে একটি doji দেয়। পরের candle doji-র high-এর উপরে close করে, buy stop fill হয়। দাম 2R পর্যন্ত ওঠে।"},
    {"en": "Candle 5 marks support near 2318.5. Candles 11-17 fall back to it. Candle 18 is a doji: open and close almost equal, wicks on both sides, low just under support. Candle 19 closes above the doji high and fills the buy stop. The stop sits under the doji low; price reaches 2R.",
     "bn": "৫ নম্বর candle প্রায় 2318.5-এ support তৈরি করে। ১১-১৭ নম্বর আবার সেখানে নামে। ১৮ নম্বর doji: open আর close প্রায় সমান, দুই দিকে wick, low support-এর সামান্য নিচে। ১৯ নম্বর doji-র high-এর উপরে close করে buy stop fill করে। Stop doji-র low-এর নিচে; দাম 2R পর্যন্ত যায়।"},
    [
        hline(support, "Support", BLUE),
        marker(5, "1st touch"),
        marker(18, "Doji"),
        marker(19, "Confirmation"),
        hline(entry, "Entry (high break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A doji at a level asks; the next close answers", "bn": "Level-এ doji প্রশ্ন করে; পরের close উত্তর দেয়"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=19, expect="win"))

# ───────────── FAIL: doji at a support tested again and again under lower highs ─────────────
P = 0.0001
b = Builder(start=1.2760, pip=P, seed=61)
b.walk([-40, -35, -50])                                            # 0-2 drop
o = b.last
b.add(o=o, h=o + 5 * P, l=1.2606, c=1.2612)                        # 3 lands above support
support = 1.2600
b.add(o=b.last, h=b.last + 10 * P, l=support, c=b.last + 25 * P)   # 4 1st touch
b.walk([45, 30, -20])                                              # 5-7 bounce
fill = round((1.2640 - b.last) / P)
b.walk([fill])                                                     # 8
b.add(o=b.last, h=b.last + 8 * P, l=support + 2 * P, c=b.last + 20 * P)  # 9 2nd touch
b.walk([30, 12])                                                   # 10-11 lower high
lower_high = round(max(k["h"] for k in b.candles[10:12]), 4)
b.walk([-30, -22])                                                 # 12-13
o = b.last
b.add(o=o, h=o + 6 * P, l=1.2607, c=1.2614)                        # 14 3rd approach (stays above support)
o = b.last
d_idx = b.add(o=o, h=o + 28 * P, l=o - 26 * P, c=o + 1 * P)         # 15 DOJI
dj = b.candles[d_idx]
entry = round(dj["h"] + 3 * P, 5)
stop = round(dj["l"] - 10 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
b.add(o=dj["c"], h=entry + 10 * P, l=dj["c"] - 8 * P, c=entry + 4 * P)   # 16 confirmation closes above
c = b.last
b.add(o=c, h=c + 6 * P, l=c - 30 * P, c=c - 25 * P)                       # 17 back down
b.walk([-40, -35, -50, -20], wick=(0.15, 0.4))                             # 18-21 support breaks
print("doji", dj, "entry", entry, "stop", stop, "target", target, "lower high", lower_high,
      "room to lower high (R)", round((lower_high - entry) / (entry - stop), 2))

meta = base_meta(
    "doji-fail-01",
    {"en": "Doji at a Worn-Out Support Under Lower Highs", "bn": "Lower high-এর নিচে বারবার ছোঁয়া support-এ doji"},
    "GBPUSD", "D1", "bullish", "loss",
    ["doji", "candlestick", "fail", "support", "descending-triangle", "pattern"],
    {"en": "Illustrative synthetic GBPUSD D1: support at 1.2600 is touched for the third time while each bounce makes a lower high. A doji forms and the next candle confirms, but price turns back and breaks support.",
     "bn": "শিক্ষামূলক কাল্পনিক GBPUSD D1: 1.2600-এর support তৃতীয়বার ছোঁয়া হচ্ছে, আর প্রতিটি bounce আগের চেয়ে নিচু high বানাচ্ছে। একটি doji আসে, পরের candle confirm-ও করে, কিন্তু দাম ফিরে support ভেঙে দেয়।"},
    {"en": "Candles 4 and 9 test support at 1.2600; the bounces make lower highs (sellers press harder each time). Candle 15 is a clean doji on the third test. Candle 16 closes above its high and fills the buy stop, but the lower high is only a short distance above. Candle 17 turns down and the support breaks.",
     "bn": "৪ ও ৯ নম্বর candle 1.2600-এর support পরীক্ষা করে; bounce-গুলো lower high বানায় (প্রতিবার sellers আরও চাপ দেয়)। তৃতীয় পরীক্ষায় ১৫ নম্বর একটি পরিষ্কার doji। ১৬ নম্বর তার high-এর উপরে close করে buy stop fill করে, কিন্তু lower high খুব কাছেই। ১৭ নম্বর নিচে ঘোরে, support ভাঙে।"},
    [
        hline(support, "Support (3rd test)", BLUE),
        hline(lower_high, "Lower high", BLUE, style="dotted"),
        marker(15, "Doji"),
        marker(16, "Confirmation"),
        hline(entry, "Entry (high break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Check the room to the nearest obstacle, not just the textbook 2R", "bn": "বইয়ের 2R নয়, সবচেয়ে কাছের বাধা পর্যন্ত জায়গা মাপুন"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=16, expect="loss"))
