from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: harami at a tested support, long on the break of the mother candle's midpoint ─────────────
P = 0.01
b = Builder(start=148.60, pip=P, seed=271, decimals=3)
b.walk([-12, -15, -10, -14])                                       # 0-3 decline
support = round(min(k["l"] for k in b.candles) - 3 * P, 3)
o = b.last
b.add(o=o, h=o + 5 * P, l=support, c=support + 12 * P)             # 4 first touch
b.walk([18, 22, -6, 20, 16, 12])                                   # 5-10 bounce
swing_high = round(max(k["h"] for k in b.candles[5:11]), 3)
b.walk([-16, -18, -14, -12])                                       # 11-14 back down
o = b.last
mother_c = support + 4 * P
b.add(o=o, h=o + 3 * P, l=support + 1 * P, c=mother_c)              # 15 MOTHER: long bearish candle
mo = b.candles[-1]
body = mo["o"] - mo["c"]
bo, bc = mo["c"], round(mo["c"] + 0.45 * body, 3)              # Forex: baby opens at the mother close
h_idx = b.add(o=bo, h=bc + 2 * P, l=bo - 2 * P, c=bc)               # 16 HARAMI baby: inside the mother body
hb = b.candles[h_idx]
mid = round((mo["o"] + mo["c"]) / 2, 3)
entry = round(mid + 2 * P, 3)                                       # buy stop just above the mother midpoint
stop = round(mo["l"] - 5 * P, 3)
target = round(entry + 2 * (entry - stop), 3)
b.add(o=hb["c"], h=entry + 10 * P, l=hb["c"] - 2 * P, c=entry + 7 * P)   # 17 confirmation
b.walk([14, -5, 18, 12, -6, 16, 10], wick=(0.15, 0.4))                   # 18-24 rally
print("mother", mo, "baby", hb, "mid", mid, "entry", entry, "stop", stop, "target", target,
      "swing", swing_high, "room R", round((swing_high - entry) / (entry - stop), 2))

meta = base_meta(
    "bullish-harami-win-01",
    {"en": "Bullish Harami at Tested Support, Entry Above the Mother Midpoint", "bn": "পরীক্ষিত support-এ bullish harami, mother candle-এর মাঝের উপরে entry"},
    "USDJPY", "H1", "bullish", "win",
    ["bullish-harami", "harami", "candlestick", "support", "pattern"],
    {"en": "Illustrative synthetic USDJPY H1: a long bearish candle drives into a support that held once. The next candle is small and stays inside its body: a bullish harami. A buy stop just above the mother candle's midpoint fills on the next candle; price rallies to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক USDJPY H1: একটি লম্বা bearish candle আগে একবার ধরে রাখা support-এ নামে। পরের candle ছোট, তার body-র ভেতরেই থাকে: bullish harami। Mother candle-এর মাঝের ঠিক উপরের buy stop পরের candle-এ fill হয়; দাম 2R পর্যন্ত যায়।"},
    {"en": "Candle 4 marks support. Candle 15 is the long bearish mother candle into it. Candle 16 is a small bullish candle entirely inside the mother's body: selling has stalled. Candle 17 rises through the mother's midpoint and fills the buy stop; the stop sits under the mother's low.",
     "bn": "৪ নম্বর candle support চিহ্নিত করে। ১৫ নম্বর সেখানে লম্বা bearish mother candle। ১৬ নম্বর ছোট bullish candle, পুরোটা mother-এর body-র ভেতরে: selling থেমেছে। ১৭ নম্বর mother-এর মাঝ পার হয়ে buy stop fill করে; stop mother-এর low-এর নিচে।"},
    [
        hline(support, "Support", BLUE),
        marker(15, "Mother", below=False),
        marker(16, "Harami"),
        hline(mid, "Mother 50%", BLUE, style="dotted"),
        hline(entry, "Entry (above 50%)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A harami is a pause; trade the break that ends the pause", "bn": "Harami একটি বিরতি; বিরতি ভাঙার দিকে trade"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=17, expect="win"))

# ───────────── FAIL: harami trade aiming past the mother candle's top ─────────────
D = 1.0
b = Builder(start=2440.0, pip=D, seed=277, decimals=2)
b.walk([-14, -18, 6, -16, -12])                                    # 0-4 decline
o = b.last
b.add(o=o, h=o + 3, l=o - 46, c=o - 44)                             # 5 MOTHER: huge bearish candle
mo = b.candles[-1]
support = round(mo["l"] - 2, 2)
body = mo["o"] - mo["c"]
bo, bc = mo["c"], round(mo["c"] + 0.3 * body, 2)
h_idx = b.add(o=bo, h=bc + 2, l=bo - 1, c=bc)                        # 6 HARAMI baby
hb = b.candles[h_idx]
entry = round(hb["h"] + 1, 2)                                        # buy stop above the baby high
stop = round(mo["l"] - 4, 2)
target = round(entry + 2 * (entry - stop), 2)
room = round((mo["o"] - entry) / (entry - stop), 2)
assert room < 1.5, room
b.add(o=hb["c"], h=entry + 8, l=hb["c"] - 2, c=entry + 6)            # 7 fills
c = b.last
b.add(o=c, h=mo["o"] - 2, l=c - 3, c=c + 10)                         # 8 rallies into the mother's open
c = b.last
b.add(o=c, h=c + 1, l=c - 18, c=c - 16)                              # 9 rejected there
b.walk([-14, -16, -12], wick=(0.15, 0.4))                            # 10-12 back through the stop
print("mother", mo, "baby", hb, "entry", entry, "stop", stop, "target", target, "room to mother open R", room)

meta = base_meta(
    "bullish-harami-fail-01",
    {"en": "Bullish Harami With the Target Past the Mother Candle", "bn": "Mother candle-এর ওপারে target-সহ bullish harami"},
    "XAUUSD", "D1", "bullish", "loss",
    ["bullish-harami", "harami", "candlestick", "fail", "target", "pattern"],
    {"en": "Illustrative synthetic XAUUSD D1: after a huge bearish day, a small harami forms low inside its body. The long fills above the harami high, rallies right up to the mother candle's open, is rejected there, and falls back through the stop. The 2R target lay beyond that obstacle.",
     "bn": "শিক্ষামূলক কাল্পনিক XAUUSD D1: একটি বিশাল bearish দিনের পর তার body-র নিচের দিকে ছোট harami। Harami high-এর উপরে long fill হয়, দাম ঠিক mother candle-এর open পর্যন্ত ওঠে, সেখানে প্রত্যাখ্যাত হয়, তারপর stop ভেঙে নামে। 2R target ছিল সেই বাধার ওপারে।"},
    {"en": "Candle 5 is a huge bearish mother candle. Candle 6 is a small harami near its low. The buy stop above the harami high fills on candle 7. But the mother's open sits only about 1.2R above the entry, while the 2R target lies beyond it. Candle 8 rallies into the mother's open, candle 9 is rejected, and price returns through the stop.",
     "bn": "৫ নম্বর বিশাল bearish mother candle। ৬ নম্বর তার low-এর কাছে ছোট harami। Harami high-এর উপরের buy stop ৭ নম্বরে fill হয়। কিন্তু mother-এর open entry-র মাত্র প্রায় 1.2R উপরে, আর 2R target তার ওপারে। ৮ নম্বর mother-এর open পর্যন্ত ওঠে, ৯ নম্বর প্রত্যাখ্যাত হয়, দাম stop ভেঙে ফেরে।"},
    [
        hline(mo["o"], "Mother open (obstacle)", BLUE),
        marker(5, "Mother", below=False),
        marker(6, "Harami"),
        hline(entry, "Entry (baby high)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "The mother candle's open is the first wall above a bullish harami", "bn": "Bullish harami-র উপরের প্রথম দেয়াল mother candle-এর open"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=7, expect="loss"))
