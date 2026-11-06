from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: bearish harami cross at an old high, short below the mother midpoint ─────────────
P = 0.0001
b = Builder(start=1.2500, pip=P, seed=291)
b.walk([18, 22, -8, 25, 15])                                      # 0-4 rally
res = round(max(k["h"] for k in b.candles) + 3 * P, 4)
o = b.last
b.add(o=o, h=res, l=o - 10 * P, c=res - 18 * P)                   # 5 old high
b.walk([-20, -25, -15, 8, -18])                                   # 6-10 pullback
swing_low = round(min(k["l"] for k in b.candles[6:11]), 5)
b.walk([16, 20, 14])                                              # 11-13 rally back
o = b.last
b.add(o=o, h=max(o, res - 40 * P) + 3 * P, l=min(o, res - 40 * P) - 3 * P, c=res - 40 * P)   # 14
o = b.last
b.add(o=o, h=res + 2 * P, l=o - 2 * P, c=res - 2 * P)              # 15 MOTHER: long bullish into the old high
mo = b.candles[-1]

hb_idx = b.add(o=mo["c"], h=mo["c"] + 4 * P, l=mo["c"] - 12 * P, c=mo["c"] - 0.5 * P)  # 16 HARAMI CROSS (doji at top of body)
hb = b.candles[hb_idx]
mid = round((mo["o"] + mo["c"]) / 2, 5)
entry = round(mid - 2 * P, 5)
stop = round(max(mo["h"], hb["h"]) + 5 * P, 5)
target = round(entry - 2 * (stop - entry), 5)
c = b.last
b.add(o=c, h=c + 2 * P, l=entry - 8 * P, c=entry - 5 * P)          # 17 breaks below the mother midpoint
b.walk([-18, 6, -22, -15, 5, -20, -14], wick=(0.15, 0.4))          # 18-24 decline
print("mother", mo, "baby", b.candles[16], "mid", mid, "entry", entry, "stop", stop, "target", target,
      "swing low", swing_low, "room R", round((entry - swing_low) / (stop - entry), 2))

meta = base_meta(
    "bearish-harami-win-01",
    {"en": "Bearish Harami Cross at an Old High, Short Below the Mother Midpoint", "bn": "পুরোনো high-এ bearish harami cross, mother-এর মাঝের নিচে short"},
    "GBPUSD", "H4", "bearish", "win",
    ["bearish-harami", "harami", "candlestick", "resistance", "pattern"],
    {"en": "Illustrative synthetic GBPUSD H4: a long bullish candle runs into an old high, then a doji forms inside the top of its body: a bearish harami cross. The next candle falls through the mother's midpoint, filling a sell stop; price drops to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক GBPUSD H4: একটি লম্বা bullish candle পুরোনো high-এ পৌঁছায়, তারপর তার body-র উপরের দিকে একটি doji: bearish harami cross। পরের candle mother-এর মাঝ ভেদ করে নামে, sell stop fill হয়; দাম 2R পর্যন্ত নামে।"},
    {"en": "Candle 5 makes the old high. Candle 15 is a long bullish mother candle up to it. Candle 16 is a doji inside the top of the mother's body: buying has stalled at the level. Candle 17 falls through the mother's midpoint and fills the sell stop; the stop sits above the mother's high.",
     "bn": "৫ নম্বর candle পুরোনো high বানায়। ১৫ নম্বর সেখানে পর্যন্ত লম্বা bullish mother candle। ১৬ নম্বর mother-এর body-র উপরের দিকে একটি doji: level-এ buying থেমেছে। ১৭ নম্বর mother-এর মাঝ ভেদ করে sell stop fill করে; stop mother-এর high-এর উপরে।"},
    [
        hline(res, "Old high (resistance)", BLUE),
        marker(15, "Mother"),
        marker(16, "Harami cross", below=False),
        hline(mid, "Mother 50%", BLUE, style="dotted"),
        hline(entry, "Entry (below 50%)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A harami cross at a level shows buyers stalling; the mother's midpoint is the trigger", "bn": "Level-এ harami cross দেখায় buyers থেমেছে; mother-এর মাঝ trigger"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=17, expect="win"))

# ───────────── FAIL: bearish harami inside a sideways range, no trend before it ─────────────
P = 0.0001
b = Builder(start=1.0900, pip=P, seed=293)
b.walk([12, -10, 14, -12, 10, -14, 12, -9, 11], wick=(0.3, 0.6))  # 0-8 choppy range
rng_hi = round(max(k["h"] for k in b.candles), 5)
rng_lo = round(min(k["l"] for k in b.candles), 5)
o = b.last
b.add(o=o, h=o + 22 * P, l=o - 2 * P, c=o + 20 * P)                 # 9 MOTHER: bullish candle up to the range top
mo = b.candles[-1]
hb_idx = b.add(o=mo["c"], h=mo["c"] + 2 * P, l=mo["c"] - 9 * P, c=mo["c"] - 7 * P)   # 10 HARAMI (small red inside)
hb = b.candles[hb_idx]
mid = round((mo["o"] + mo["c"]) / 2, 5)
entry = round(mid - 1 * P, 5)
stop = round(mo["h"] + 4 * P, 5)
target = round(entry - 2 * (stop - entry), 5)
c = hb["c"]
b.add(o=c, h=c + 2 * P, l=entry - 4 * P, c=entry - 2 * P)            # 11 breaks the midpoint, fills
c = b.last
b.add(o=c, h=c + 14 * P, l=c - 3 * P, c=c + 12 * P)                  # 12 chop back up
b.walk([14, 10, -5, 12], wick=(0.3, 0.6))                            # 13-16 range swings up through the stop
print("mother", mo, "baby", hb, "entry", entry, "stop", stop, "target", target, "range", rng_lo, rng_hi)

meta = base_meta(
    "bearish-harami-fail-01",
    {"en": "Bearish Harami Inside a Sideways Range", "bn": "পাশাপাশি range-এর ভেতরে bearish harami"},
    "EURUSD", "H1", "bearish", "loss",
    ["bearish-harami", "harami", "candlestick", "fail", "range", "pattern"],
    {"en": "Illustrative synthetic EURUSD H1: inside a choppy sideways range, a green candle is followed by a small red candle inside it. With no uptrend to reverse, the short below the midpoint is just one more swing of the chop and the stop goes.",
     "bn": "শিক্ষামূলক কাল্পনিক EURUSD H1: এলোমেলো পাশাপাশি range-এর ভেতরে একটি সবুজ candle, তারপর তার ভেতরে ছোট লাল candle। উল্টানোর মতো কোনো uptrend নেই, তাই মাঝের নিচে short শুধু আরেকটি ঢেউ, আর stop যায়।"},
    {"en": "Candles 0-8 chop sideways with no direction. Candle 9 is a green candle that pushes up to the top of that range; candle 10 is a small red candle inside its body: a harami by shape. But there was no uptrend, so there is nothing to reverse. Candle 11 dips below the midpoint and fills the sell stop; the range swings back up and takes the stop.",
     "bn": "০-৮ নম্বর candle কোনো দিক ছাড়া পাশাপাশি চলে। ৯ নম্বর একটি সবুজ candle, range-এর উপরের প্রান্ত পর্যন্ত ওঠে; ১০ নম্বর তার body-র ভেতরে ছোট লাল candle: আকারে harami। কিন্তু কোনো uptrend ছিল না, তাই উল্টানোর কিছু নেই। ১১ নম্বর মাঝের নিচে নেমে sell stop fill করে; range আবার উপরে ঢেউ দিয়ে stop নেয়।"},
    [
        hline(rng_hi, "Range high", BLUE, style="dotted"),
        hline(rng_lo, "Range low", BLUE, style="dotted"),
        marker(10, "Harami (no trend)", below=False),
        hline(entry, "Entry (below 50%)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A reversal pattern needs a trend to reverse", "bn": "Reversal pattern-এর জন্য উল্টানোর মতো trend লাগে"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=11, expect="loss"))
