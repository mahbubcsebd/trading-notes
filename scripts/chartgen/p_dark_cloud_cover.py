from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: deep dark cloud cover at an old high, short on the low break ─────────────
D = 1.0
b = Builder(start=2330.0, pip=D, seed=251, decimals=2)
b.walk([5, 6, -2, 7, 4])                                          # 0-4 rally
res = round(max(k["h"] for k in b.candles) + 1, 2)
o = b.last
b.add(o=o, h=res, l=o - 3, c=res - 5)                             # 5 old high
b.walk([-6, -8, -5, 2, -6])                                       # 6-10 pullback
swing_low = round(min(k["l"] for k in b.candles[6:11]), 2)
b.walk([5, 6, 4, 5])                                              # 11-14 rally back
o = b.last
b.add(o=o, h=res - 4, l=o - 1.5, c=res - 7)                        # 15 under the old high
o = b.last
b.add(o=o, h=res - 0.5, l=o - 1, c=o + 9)                          # 16 long bullish candle 1
c1 = b.candles[-1]
body1 = c1["c"] - c1["o"]
c2c = round(c1["c"] - 0.7 * body1, 2)                              # closes 70% into the green body
dc_idx = b.add(o=c1["c"], h=res + 4, l=c2c - 0.5, c=c2c)            # 17 DARK CLOUD candle (wick above old high)
dc = b.candles[dc_idx]
entry = round(dc["l"] - 0.5, 2)
stop = round(max(dc["h"], c1["h"]) + 1.5, 2)
target = round(entry - 2 * (stop - entry), 2)
b.add(o=dc["c"], h=dc["c"] + 1, l=entry - 4, c=entry - 3)           # 18 breaks the dark cloud low
b.walk([-5, 2, -6, -4, 1, -6, -5], wick=(0.15, 0.4))                # 19-25 decline
print("dark cloud", c1, dc, "res", res, "entry", entry, "stop", stop, "target", target,
      "swing low", swing_low, "room R", round((entry - swing_low) / (stop - entry), 2))

meta = base_meta(
    "dark-cloud-cover-win-01",
    {"en": "Deep Dark Cloud Cover at an Old High, Short on the Low Break", "bn": "পুরোনো high-এ গভীর dark cloud cover, low ভাঙলে short"},
    "XAUUSD", "H1", "bearish", "win",
    ["dark-cloud-cover", "candlestick", "resistance", "pattern"],
    {"en": "Illustrative synthetic XAUUSD H1: a long green candle runs up to an old high, then a red candle pokes above the level and closes about 70% down into the green body. The next candle breaks the dark cloud low; price falls to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক XAUUSD H1: একটি লম্বা সবুজ candle পুরোনো high পর্যন্ত ওঠে, তারপর একটি লাল candle level-এর উপরে উঁকি দিয়ে সবুজ body-র প্রায় 70% পর্যন্ত নেমে close করে। পরের candle dark cloud-এর low ভাঙে; দাম 2R পর্যন্ত নামে।"},
    {"en": "Candle 5 makes the old high. Candle 16 is a long green candle that closes just above it. Candle 17 opens at that close, wicks above the old high, then closes about 70% down into candle 16's body, but above its open: a dark cloud cover. Candle 18 breaks its low and fills the sell stop.",
     "bn": "৫ নম্বর candle পুরোনো high বানায়। ১৬ নম্বর একটি লম্বা সবুজ candle, close তার সামান্য উপরে। ১৭ নম্বর তার close-এ open করে, পুরোনো high-এর উপরে wick দেয়, তারপর ১৬ নম্বরের body-র প্রায় 70% পর্যন্ত নেমে close করে, কিন্তু তার open-এর উপরে: dark cloud cover। ১৮ নম্বর তার low ভেঙে sell stop fill করে।"},
    [
        hline(res, "Old high (resistance)", BLUE),
        marker(17, "Dark cloud cover", below=False),
        hline(entry, "Entry (low break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "The deeper the red close into the green body, the stronger the signal", "bn": "লাল close সবুজ body-র যত গভীরে, signal তত শক্ত"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=18, expect="win"))

# ───────────── FAIL: a textbook setup that simply loses (every box ticked) ─────────────
P = 0.0001
b = Builder(start=1.0700, pip=P, seed=257)
b.walk([30, 35, -10, 40, 25])                                     # 0-4 rally
res = round(max(k["h"] for k in b.candles) + 3 * P, 4)
o = b.last
b.add(o=o, h=res, l=o - 15 * P, c=res - 25 * P)                   # 5 old high
b.walk([-35, -40, -25, 10, -30])                                  # 6-10 pullback
swing_low = round(min(k["l"] for k in b.candles[6:11]), 5)
b.walk([28, 32, 25])                                              # 11-13 rally back
o = b.last
b.add(o=o, h=max(o, res - 60 * P) + 4 * P, l=min(o, res - 60 * P) - 6 * P, c=res - 60 * P)  # 14 below the old high
o = b.last
assert o + 50 * P < res
b.add(o=o, h=o + 52 * P, l=o - 4 * P, c=o + 50 * P)                # 15 long green candle 1
c1 = b.candles[-1]
body1 = c1["c"] - c1["o"]
c2c = round(c1["c"] - 0.68 * body1, 5)
dc_idx = b.add(o=c1["c"], h=res + 12 * P, l=c2c - 3 * P, c=c2c)     # 16 DARK CLOUD, deep, at the old high
dc = b.candles[dc_idx]
entry = round(dc["l"] - 3 * P, 5)
stop = round(max(dc["h"], c1["h"]) + 8 * P, 5)
target = round(swing_low + 3 * P, 5)                              # just before the swing low
assert (entry - target) / (stop - entry) >= 1.5
b.add(o=dc["c"], h=dc["c"] + 4 * P, l=entry - 10 * P, c=entry - 6 * P)   # 17 breaks the low, fills
c = b.last
b.add(o=c, h=c + 8 * P, l=c - 14 * P, c=c - 4 * P)                      # 18 stalls
b.walk([30, 35, 28, 20], wick=(0.15, 0.4))                               # 19-22 buyers return through the stop
print("dark cloud", c1, dc, "entry", entry, "stop", stop, "target", target,
      "swing low", swing_low, "room R", round((entry - swing_low) / (stop - entry), 2))

meta = base_meta(
    "dark-cloud-cover-fail-01",
    {"en": "Textbook Dark Cloud Cover That Still Loses", "bn": "সব নিয়ম মেনেও হেরে যাওয়া dark cloud cover"},
    "EURUSD", "D1", "bearish", "loss",
    ["dark-cloud-cover", "candlestick", "fail", "expectancy", "pattern"],
    {"en": "Illustrative synthetic EURUSD D1: a deep dark cloud cover at a clearly marked old high, confirmed by a low break, with room to support below. Every checklist box is ticked, and the trade still loses when buyers return.",
     "bn": "শিক্ষামূলক কাল্পনিক EURUSD D1: স্পষ্ট পুরোনো high-এ গভীর dark cloud cover, low ভেঙে confirmation, নিচে support পর্যন্ত জায়গাও আছে। Checklist-এর সব ঘর পূর্ণ, তবু buyers ফিরে এলে trade হারে।"},
    {"en": "Candle 5 marks the old high. Candle 16 is a deep dark cloud cover there, about 68% into candle 15's green body. Candle 17 breaks its low and fills the sell stop. Nothing is wrong with the setup. Candle 18 stalls and the rally from candle 19 takes the stop. This is a normal loss inside a positive-expectancy plan.",
     "bn": "৫ নম্বর candle পুরোনো high চিহ্নিত করে। ১৬ নম্বর সেখানে গভীর dark cloud cover, ১৫ নম্বরের সবুজ body-র প্রায় 68% পর্যন্ত। ১৭ নম্বর তার low ভেঙে sell stop fill করে। Setup-এ কোনো ভুল নেই। ১৮ নম্বর থেমে যায়, ১৯ নম্বর থেকে rally stop নিয়ে যায়। এটা লাভজনক পরিকল্পনার ভেতরের স্বাভাবিক লোকসান।"},
    [
        hline(res, "Old high (resistance)", BLUE),
        marker(16, "Dark cloud cover", below=False),
        hline(entry, "Entry (low break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target (above swing low)", GREEN),
    ],
    {"en": "A good setup can lose; the stop and the size keep that loss small", "bn": "ভালো setup-ও হারতে পারে; stop আর size সেই লোকসান ছোট রাখে"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=17, expect="loss"))
