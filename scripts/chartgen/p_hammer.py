from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

P = 0.0001

# ───────────── WIN: hammer at a tested support, entry on break of hammer high ─────────────
b = Builder(start=1.2790, pip=P, seed=11)
b.walk([-14, -18, -12, -20, -16])                       # 0-4 drop to support
b.add(o=b.last, h=b.last + 6 * P, l=1.2701, c=b.last + 9 * P)  # 5 first touch of support
b.walk([16, 22, 14, 18, 9])                             # 6-10 bounce
b.walk([-8, -15, -11, -17, -9, -14, -12])               # 11-17 lower highs back down
fill = round((1.2716 - b.last) / P)
b.walk([fill])                                          # 18 into support
o = b.last
h_idx = b.add(o=o, h=o + 21 * P, l=1.2668, c=o + 16 * P)     # 19 HAMMER
ham = b.candles[h_idx]
b.add(o=ham["c"], h=ham["c"] + 36 * P, l=ham["c"] - 4 * P, c=ham["c"] + 31 * P)  # 20 confirmation
entry = round(ham["h"] + 2 * P, 5)
stop = round(ham["l"] - 8 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
b.walk([14, -6, 20, 16, -8, 22, 18, 24, 20, 12], wick=(0.15, 0.4))   # 21-30 rally
print("hammer", ham, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "hammer-win-01",
    {"en": "Hammer at Tested Support, Break of Hammer High", "bn": "পরীক্ষিত support-এ hammer, hammer high ভাঙলে entry"},
    "GBPUSD", "H4", "bullish", "win",
    ["hammer", "candlestick", "support", "pattern"],
    {"en": "Illustrative synthetic GBPUSD H4: price returns to a support that already held once, prints a hammer that dips below it and closes back above. The next candle breaks the hammer high.",
     "bn": "শিক্ষামূলক কাল্পনিক GBPUSD H4: দাম আগে একবার ধরে রাখা support-এ ফেরে, hammer সামান্য নিচে নেমে আবার উপরে close করে। পরের candle hammer-এর high ভাঙে।"},
    {"en": "Candle 5 marks support at 1.2700. Candles 11-18 fall back to it. Candle 19 dips to 1.2668, below support, and closes near its high: a hammer. Candle 20 breaks the hammer high, filling a buy stop. The stop sits under the hammer low; price reaches 2R.",
     "bn": "৫ নম্বর candle 1.2700-এ support তৈরি করে। ১১-১৮ নম্বর আবার সেখানে নামে। ১৯ নম্বর 1.2668 পর্যন্ত নেমে, support-এর নিচে গিয়ে, নিজের high-এর কাছে close করে: hammer। ২০ নম্বর hammer-এর high ভাঙে, buy stop fill হয়। Stop hammer low-এর নিচে; দাম 2R পর্যন্ত যায়।"},
    [
        hline(1.27, "Support", BLUE),
        marker(5, "1st touch"),
        marker(19, "Hammer"),
        hline(entry, "Entry (high break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Level first, shape second, trigger third", "bn": "আগে level, তারপর আকার, তারপর trigger"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=20, expect="win"))

# ───────────── FAIL: hammer in mid-air during a momentum drop ─────────────
b = Builder(start=1.2860, pip=P, seed=23)
b.walk([-10, 6, -12, -9, 5])                            # 0-4 drift
b.walk([-28, -34, -22, -38, -26], wick=(0.1, 0.3))       # 5-9 strong momentum drop, big bodies
o = b.last
h_idx = b.add(o=o, h=o + 14 * P, l=o - 38 * P, c=o + 10 * P)   # 10 HAMMER in mid-air
ham = b.candles[h_idx]
entry = round(ham["h"] + 2 * P, 5)
# 11: wick breaks hammer high (fills buy stop) but closes weak, below hammer close
b.add(o=ham["c"], h=entry + 5 * P, l=ham["c"] - 9 * P, c=ham["c"] - 6 * P)
stop = round(ham["l"] - 8 * P, 5)
target = round(entry + 2 * (entry - stop), 5)
b.walk([-16, -30, -24, -18, 8, -20, -12], wick=(0.1, 0.35))   # 12-18 drop continues to real support
print("hammer", ham, "entry", entry, "stop", stop, "target", target, "last", b.last)
support = round(b.last - 4 * P, 4)

meta = base_meta(
    "hammer-fail-01",
    {"en": "Hammer in Mid-Air During a Momentum Drop", "bn": "Momentum drop-এর মাঝখানে ফাঁকা জায়গায় hammer"},
    "GBPUSD", "H4", "bullish", "loss",
    ["hammer", "candlestick", "fail", "location", "pattern"],
    {"en": "Illustrative synthetic GBPUSD H4: a hammer forms after five large bearish candles with no support nearby. The next candle pokes above the hammer high and fills the entry, then closes weak. Price breaks the hammer low.",
     "bn": "শিক্ষামূলক কাল্পনিক GBPUSD H4: কাছে কোনো support নেই, পাঁচটি বড় bearish candle-এর পর hammer। পরের candle-এর wick hammer high ছুঁয়ে entry fill করে, কিন্তু দুর্বল close দেয়। এরপর দাম hammer low ভাঙে।"},
    {"en": "Candles 5-9 are large bearish candles: strong selling momentum. Candle 10 is a valid hammer by shape, but it has no level under it. Candle 11 fills the buy stop with a wick and closes below the hammer close. Candle 13 breaks the stop. Price only finds support much lower.",
     "bn": "৫-৯ নম্বর বড় bearish candle: শক্তিশালী selling momentum। ১০ নম্বর আকারে সঠিক hammer, কিন্তু নিচে কোনো level নেই। ১১ নম্বর wick দিয়ে buy stop fill করে, কিন্তু hammer-এর close-এর নিচে close করে। ১৩ নম্বর stop ভাঙে। দাম অনেক নিচে গিয়ে support পায়।"},
    [
        marker(10, "Hammer (no level)"),
        marker(11, "Weak close", below=False),
        hline(entry, "Entry", GOLD),
        hline(stop, "Stop", RED),
        hline(support, "Real support", BLUE),
    ],
    {"en": "A perfect shape in the wrong place is still the wrong trade", "bn": "ভুল জায়গায় নিখুঁত আকারও ভুল trade"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=11, expect="loss"))
