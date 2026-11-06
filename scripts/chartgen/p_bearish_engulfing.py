from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: downtrend continuation — bearish engulfing at broken support, close entry ─────────────
P = 0.01
b = Builder(start=152.00, pip=P, seed=211, decimals=3)
b.walk([-8, 6, -7, 9, -6, 7, -5])                                   # 0-6 range above a floor
floor = round(min(k["l"] for k in b.candles) - 3 * P, 3)
o = b.last
b.add(o=o, h=o + 4 * P, l=floor - 60 * P, c=floor - 55 * P)          # 7 breakdown
b.walk([-40, -30, 12, -45, -35])                                    # 8-12 move down
swing_low = round(min(k["l"] for k in b.candles), 3)
b.walk([30, 35, 25])                                                # 13-15 pullback up
o = b.last
b.add(o=o, h=floor - 4 * P, l=o - 8 * P, c=floor - 12 * P)           # 16 into the old floor
o = b.last
b.add(o=o, h=floor + 6 * P, l=o - 5 * P, c=o + 14 * P)               # 17 small bullish candle
c1 = b.candles[-1]
be_idx = b.add(o=c1["c"], h=c1["c"] + 4 * P, l=c1["o"] - 44 * P, c=c1["o"] - 40 * P)   # 18 BEARISH ENGULFING
be = b.candles[be_idx]
entry = be["c"]
stop = round(max(be["h"], c1["h"]) + 6 * P, 3)
target = round(entry - 2 * (stop - entry), 3)
c = be["c"]
b.add(o=c, h=c + 10 * P, l=c - 22 * P, c=c - 18 * P)                 # 19 follow-through
b.walk([-30, 12, -40, -35, 10, -45, -30], wick=(0.15, 0.4))          # 20-26 trend resumes
print("engulfing", c1, be, "floor", floor, "entry", entry, "stop", stop, "target", target,
      "swing low", swing_low, "room R", round((entry - swing_low) / (stop - entry), 2))

meta = base_meta(
    "bearish-engulfing-win-01",
    {"en": "Bearish Engulfing at Broken Support, Downtrend Continuation", "bn": "ভাঙা support-এ bearish engulfing, downtrend-এর ধারাবাহিকতা"},
    "USDJPY", "D1", "bearish", "win",
    ["bearish-engulfing", "engulfing", "candlestick", "retest", "trend", "pattern"],
    {"en": "Illustrative synthetic USDJPY D1: price breaks a floor, falls, then pulls back up into the old floor and prints a bearish engulfing there. A short at the engulfing close runs to 2R as the downtrend resumes.",
     "bn": "শিক্ষামূলক কাল্পনিক USDJPY D1: দাম একটি floor ভেঙে নামে, তারপর পুরোনো floor-এ ফিরে সেখানে bearish engulfing দেয়। Engulfing-এর close-এ short, downtrend আবার চললে 2R।"},
    {"en": "Candles 0-6 range above a floor; candle 7 breaks it. Candles 13-17 pull back into the old floor, now resistance. Candle 18 is a bearish engulfing: its body covers candle 17's body about four times over and closes near its low. Short at that close, stop above the engulfing high; candle 19 follows through and price reaches 2R.",
     "bn": "০-৬ নম্বর candle একটি floor-এর উপরে range; ৭ নম্বর তা ভাঙে। ১৩-১৭ নম্বর পুরোনো floor-এ ফেরে, যা এখন resistance। ১৮ নম্বর bearish engulfing: body ১৭ নম্বরের body-র প্রায় চার গুণ বড় হয়ে তাকে ঢাকে, close low-এর কাছে। সেই close-এ short, stop engulfing high-এর উপরে; ১৯ নম্বর follow-through দেয়, দাম 2R পর্যন্ত নামে।"},
    [
        hline(floor, "Old floor (now resistance)", BLUE),
        marker(7, "Breakdown", below=False),
        marker(18, "Bearish engulfing", below=False),
        hline(entry, "Entry (close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "With the trend, at a broken level, the engulfing is the trigger", "bn": "Trend-এর দিকে, ভাঙা level-এ, engulfing-ই trigger"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=18, expect="win"))

# ───────────── FAIL: valid bearish engulfing, then no follow-through for many candles (time stop ignored) ─────────────
D = 1.0
b = Builder(start=2360.0, pip=D, seed=223, decimals=2)
b.walk([10, 12, -4, 11, 9, -3, 10])                                 # 0-6 rally
res = round(max(k["h"] for k in b.candles) + 1, 2)
o = b.last
b.add(o=o, h=res, l=o - 3, c=o + 5)                                  # 7 small bullish into the high
c1 = b.candles[-1]
be_idx = b.add(o=c1["c"], h=c1["c"] + 1.5, l=c1["o"] - 14, c=c1["o"] - 12)   # 8 BEARISH ENGULFING
be = b.candles[be_idx]
entry = be["c"]
stop = round(max(be["h"], c1["h"]) + 2, 2)
target = round(entry - 2 * (stop - entry), 2)
mid = entry
for m in [-3, 2, -2, 3, -1, 2]:                                      # 9-14 drift sideways, no follow-through
    o = b.last
    b.add(o=o, h=max(o, o + m) + 2.5, l=min(o, o + m) - 2.5, c=o + m)
time_exit = b.last
b.walk([8, 10, 9], wick=(0.15, 0.4))                                # 15-17 rally through the stop
print("engulfing", c1, be, "entry", entry, "stop", stop, "target", target, "time-stop exit ~", time_exit)

meta = base_meta(
    "bearish-engulfing-fail-01",
    {"en": "Bearish Engulfing With No Follow-Through", "bn": "Follow-through ছাড়া bearish engulfing"},
    "XAUUSD", "H4", "bearish", "loss",
    ["bearish-engulfing", "engulfing", "candlestick", "fail", "time-stop", "pattern"],
    {"en": "Illustrative synthetic XAUUSD H4: a valid bearish engulfing at a fresh high, shorted at the close. For six candles price goes nowhere; a time stop would have closed it near breakeven. Holding on, the trade is stopped out when the rally resumes.",
     "bn": "শিক্ষামূলক কাল্পনিক XAUUSD H4: নতুন high-এ সঠিক bearish engulfing, close-এ short। ছয় candle দাম কোথাও যায় না; time stop থাকলে প্রায় breakeven-এ বেরোনো যেত। ধরে রাখায় rally আবার শুরু হলে stop।"},
    {"en": "Candle 8 engulfs candle 7 and closes near its low: a valid pattern. But candles 9-14 drift sideways around the entry instead of falling. A momentum idea that does not move within about 5-6 candles is weak; a time stop would have exited near breakeven. Candles 15-16 rally and take the full stop.",
     "bn": "৮ নম্বর ৭ নম্বরকে ঢেকে low-এর কাছে close করে: সঠিক pattern। কিন্তু ৯-১৪ নম্বর নামার বদলে entry-র আশেপাশে পাশাপাশি চলে। ৫-৬ candle-এ না নড়া momentum-ধারণা দুর্বল; time stop প্রায় breakeven-এ বের করে দিত। ১৫-১৬ নম্বর উঠে পুরো stop নেয়।"},
    [
        hline(res, "Fresh high", BLUE, style="dotted"),
        marker(8, "Bearish engulfing", below=False),
        marker(14, "Time stop here", below=False),
        hline(entry, "Entry (close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "No follow-through within 5-6 candles: get out near breakeven", "bn": "৫-৬ candle-এ follow-through নেই: breakeven-এর কাছে বেরিয়ে যান"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=8, expect="loss"))
