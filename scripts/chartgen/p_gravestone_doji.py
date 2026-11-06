from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: gravestone doji pierces an old high, short on confirmation ─────────────
P = 0.0001
b = Builder(start=1.2650, pip=P, seed=91)
b.walk([12, 16, 10, 18, 8])                                      # 0-4 rally
res = round(max(k["h"] for k in b.candles) + 3 * P, 4)
o = b.last
b.add(o=o, h=res, l=o - 8 * P, c=res - 12 * P)                   # 5 makes the old high
b.walk([-16, -20, -12, 6, -14])                                  # 6-10 pullback
pull_low = round(min(k["l"] for k in b.candles[6:11]), 5)
b.walk([12, 15, 10, 14])                                         # 11-14 rally back
o = b.last
b.add(o=o, h=res - 3 * P, l=o - 4 * P, c=res - 6 * P)             # 15 arrives under the old high
o = b.last
gs_idx = b.add(o=o, h=res + 20 * P, l=o - 1 * P, c=o - 0.5 * P)   # 16 GRAVESTONE DOJI
gs = b.candles[gs_idx]
entry = round(gs["l"] - 2 * P, 5)
stop = round(gs["h"] + 5 * P, 5)
target = round(entry - 2 * (stop - entry), 5)
b.add(o=gs["c"], h=gs["c"] + 3 * P, l=entry - 10 * P, c=entry - 7 * P)   # 17 bearish confirmation
b.walk([-14, 6, -18, -12, 5, -20, -10, -14], wick=(0.15, 0.4))           # 18-25 decline
print("gravestone", gs, "res", res, "entry", entry, "stop", stop, "target", target,
      "pullback low", pull_low, "room R", round((entry - pull_low) / (stop - entry), 2))

meta = base_meta(
    "gravestone-doji-win-01",
    {"en": "Gravestone Doji Pierces an Old High, Short on Confirmation", "bn": "পুরোনো high ভেদ করে ফেরা gravestone doji, confirmation-এর পর short"},
    "GBPUSD", "H1", "bearish", "win",
    ["gravestone-doji", "doji", "candlestick", "resistance", "pattern"],
    {"en": "Illustrative synthetic GBPUSD H1: price rallies back to an old high and prints a gravestone doji whose upper wick pokes above the level. The next candle closes below it, filling a sell stop. Price falls to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক GBPUSD H1: দাম আবার পুরোনো high-এ ফিরে একটি gravestone doji দেয়, যার উপরের wick level-এর ওপারে উঁকি দেয়। পরের candle তার নিচে close করে sell stop fill করে। দাম 2R পর্যন্ত নামে।"},
    {"en": "Candle 5 makes the old high. Candles 11-15 rally back under it. Candle 16 is a gravestone doji: open, low and close almost equal, a long upper wick above the old high. Candle 17 closes below its low and fills the sell stop. The stop sits above the wick high; price reaches 2R.",
     "bn": "৫ নম্বর candle পুরোনো high বানায়। ১১-১৫ নম্বর তার নিচে ফিরে আসে। ১৬ নম্বর gravestone doji: open, low আর close প্রায় সমান, পুরোনো high-এর উপরে লম্বা উপরের wick। ১৭ নম্বর তার low-এর নিচে close করে sell stop fill করে। Stop wick-এর high-এর উপরে; দাম 2R পর্যন্ত নামে।"},
    [
        hline(res, "Old high (resistance)", BLUE),
        marker(5, "Old high", below=False),
        marker(16, "Gravestone doji", below=False),
        hline(entry, "Entry (low break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "The long upper wick is the rejection; the next close confirms it", "bn": "লম্বা উপরের wick-ই rejection; পরের close তা নিশ্চিত করে"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=17, expect="win"))

# ───────────── FAIL: gravestone at a minor high inside a strong higher-timeframe uptrend ─────────────
D = 1.0
b = Builder(start=2300.0, pip=D, seed=97, decimals=2)
b.walk([6, 8, -3, 7, 9, -4, 8, 6])                               # 0-7 strong uptrend
b.walk([-5, -6, -4])                                             # 8-10 pullback -> higher low
hl = round(min(k["l"] for k in b.candles[8:11]), 2)
b.walk([5, 6, 4])                                                # 11-13 back up to a minor high
minor = round(max(k["h"] for k in b.candles[:14]), 2)
o = b.last
gs_idx = b.add(o=o, h=o + 12, l=o - 0.4, c=o - 0.2)              # 14 GRAVESTONE at a minor high
gs = b.candles[gs_idx]
entry = round(gs["l"] - 0.5, 2)
stop = round(gs["h"] + 1.5, 2)
target = round(entry - 2 * (stop - entry), 2)
b.add(o=gs["c"], h=gs["c"] + 1.0, l=entry - 3.0, c=entry - 1.5)  # 15 confirmation closes below
b.add(o=b.last, h=b.last + 4.0, l=b.last - 2.5, c=b.last + 3.0)  # 16 stalls above the higher low area
b.walk([7, 6, 5, 8], wick=(0.15, 0.4))                           # 17-20 uptrend resumes through stop
print("gravestone", gs, "entry", entry, "stop", stop, "target", target, "higher low", hl,
      "room R", round((entry - hl) / (stop - entry), 2))

meta = base_meta(
    "gravestone-doji-fail-01",
    {"en": "Gravestone Doji Against a Strong Uptrend", "bn": "শক্তিশালী uptrend-এর বিপরীতে gravestone doji"},
    "XAUUSD", "H1", "bearish", "loss",
    ["gravestone-doji", "doji", "candlestick", "fail", "trend", "pattern"],
    {"en": "Illustrative synthetic XAUUSD H1: inside a strong uptrend, a gravestone doji forms at a minor high and the next candle confirms. The short fills, but price holds above the last higher low and the uptrend runs through the stop.",
     "bn": "শিক্ষামূলক কাল্পনিক XAUUSD H1: শক্তিশালী uptrend-এর ভেতরে একটি ছোট high-এ gravestone doji, পরের candle confirm-ও করে। Short fill হয়, কিন্তু দাম শেষ higher low-এর উপরে টিকে থাকে আর uptrend stop ভেঙে এগোয়।"},
    {"en": "Candles 0-7 are a strong uptrend; candles 8-10 leave a higher low. Candle 14 is a clean gravestone doji at a minor high, and candle 15 closes below it. But the higher low is close below the entry, so the 2R target lies past real support. Candle 16 stalls and the trend resumes through the stop.",
     "bn": "০-৭ নম্বর candle শক্তিশালী uptrend; ৮-১০ নম্বর একটি higher low রেখে যায়। ১৪ নম্বর একটি ছোট high-এ পরিষ্কার gravestone doji, ১৫ নম্বর তার নিচে close করে। কিন্তু higher low entry-র খুব কাছে নিচে, তাই 2R target আসল support-এর ওপারে। ১৬ নম্বর থেমে যায়, trend stop ভেঙে আবার চলে।"},
    [
        hline(hl, "Higher low (support)", BLUE),
        marker(14, "Gravestone (minor high)", below=False),
        marker(15, "Confirmation", below=False),
        hline(entry, "Entry (low break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A counter-trend signal needs room to the nearest support", "bn": "Trend-এর বিপরীতের signal-এর জন্য কাছের support পর্যন্ত জায়গা লাগে"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=15, expect="loss"))
