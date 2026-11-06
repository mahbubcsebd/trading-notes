from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: tweezer top at an old high, short on the low break ─────────────
P = 0.0001
b = Builder(start=1.0800, pip=P, seed=331)
b.walk([20, 25, -8, 22, 18])                                      # 0-4 rally
res = round(max(k["h"] for k in b.candles) + 3 * P, 4)
o = b.last
b.add(o=o, h=res, l=o - 10 * P, c=res - 20 * P)                   # 5 old high
b.walk([-22, -28, -15, 8, -20])                                   # 6-10 pullback
swing_low = round(min(k["l"] for k in b.candles[6:11]), 5)
b.walk([18, 22, 15])                                              # 11-13 rally back
o = b.last
b.add(o=o, h=max(o, res - 8 * P) + 2 * P, l=min(o, res - 8 * P) - 4 * P, c=res - 8 * P)   # 14 near the old high
o = b.last
high = round(res + 2 * P, 5)
b.add(o=o, h=high, l=o - 2 * P, c=high - 2 * P)                    # 15 TWEEZER A: bullish to the high
ta = b.candles[-1]
b.add(o=ta["c"], h=high - 0.5 * P, l=ta["o"] - 14 * P, c=ta["o"] - 12 * P)   # 16 TWEEZER B: same high, bearish close
tb = b.candles[-1]
entry = round(tb["l"] - 2 * P, 5)
stop = round(max(ta["h"], tb["h"]) + 5 * P, 5)
target = round(entry - 2 * (stop - entry), 5)
b.add(o=tb["c"], h=tb["c"] + 3 * P, l=entry - 8 * P, c=entry - 5 * P)         # 17 breaks the low
b.walk([-18, 6, -22, -16, 5, -20, -12], wick=(0.15, 0.4))                     # 18-24 decline
print("tweezer", ta, tb, "res", res, "entry", entry, "stop", stop, "target", target,
      "swing low", swing_low, "room R", round((entry - swing_low) / (stop - entry), 2))

meta = base_meta(
    "tweezer-top-win-01",
    {"en": "Tweezer Top at an Old High, Short on the Low Break", "bn": "পুরোনো high-এ tweezer top, low ভাঙলে short"},
    "EURUSD", "H4", "bearish", "win",
    ["tweezer-top", "tweezer", "candlestick", "resistance", "pattern"],
    {"en": "Illustrative synthetic EURUSD H4: price rallies back to an old high. A bullish candle and the next bearish candle print matching highs just above the level; the second closes below the first one's open. A sell stop under the pair fills and price falls to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক EURUSD H4: দাম আবার পুরোনো high-এ ফেরে। একটি bullish candle আর পরের bearish candle level-এর সামান্য উপরে একই high দেয়; দ্বিতীয়টা প্রথমটার open-এর নিচে close করে। জোড়ার নিচে sell stop fill হয়, দাম 2R পর্যন্ত নামে।"},
    {"en": "Candle 5 makes the old high. Candles 11-14 rally back to it. Candle 15 runs to a high just above the level; candle 16 tests the same high within half a pip and closes below candle 15's open. A tweezer top that is also a bearish engulfing. Candle 17 breaks the low and fills the sell stop; the stop sits above the shared high.",
     "bn": "৫ নম্বর candle পুরোনো high বানায়। ১১-১৪ নম্বর আবার সেখানে ওঠে। ১৫ নম্বর level-এর সামান্য উপরে একটি high দেয়; ১৬ নম্বর আধা pip-এর মধ্যে একই high পরীক্ষা করে ১৫ নম্বরের open-এর নিচে close করে। Tweezer top, যা একই সঙ্গে bearish engulfing। ১৭ নম্বর low ভেঙে sell stop fill করে; stop যৌথ high-এর উপরে।"},
    [
        hline(res, "Old high (resistance)", BLUE),
        hline(high, "Matching highs", BLUE, style="dotted"),
        marker(15, "Tweezer A", below=False),
        marker(16, "Tweezer B", below=False),
        hline(entry, "Entry (low break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "Two candles rejecting the same high at a level, plus an engulfing, is a strong combination", "bn": "Level-এ দুটি candle-এর একই high প্রত্যাখ্যান আর engulfing মিলে শক্ত"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=17, expect="win"))

# ───────────── FAIL: tweezer top in the quiet Asian session, run over at the London open ─────────────
P = 0.01
b = Builder(start=150.20, pip=P, seed=337, decimals=3)
b.walk([14, 18, -6, 16, 12, 15])                                   # 0-5 NY session uptrend
b.walk([3, -2, 2, -3, 2], wick=(0.3, 0.6), min_wick=1)             # 6-10 quiet Asian session
o = b.last
high = round(max(k["h"] for k in b.candles[6:11]) + 2 * P, 3)
b.add(o=o, h=high, l=o - 2 * P, c=high - 1 * P)                     # 11 TWEEZER A (small)
ta = b.candles[-1]
b.add(o=ta["c"], h=high - 0.2 * P, l=ta["o"] - 5 * P, c=ta["o"] - 4 * P)   # 12 TWEEZER B
tb = b.candles[-1]
entry = round(tb["l"] - 1 * P, 3)
stop = round(high + 6 * P, 3)
target = round(entry - 2 * (stop - entry), 3)
b.add(o=tb["c"], h=tb["c"] + 1 * P, l=entry - 3 * P, c=entry - 2 * P)       # 13 fills
c = b.last
b.add(o=c, h=c + 2 * P, l=c - 2 * P, c=c + 1 * P)                           # 14 drifts
c = b.last
b.add(o=c, h=c + 30 * P, l=c - 2 * P, c=c + 26 * P)                         # 15 LONDON OPEN breakout through the stop
b.walk([14, 10, -4, 12], wick=(0.15, 0.4))                                  # 16-19 trend resumes
print("tweezer", ta, tb, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "tweezer-top-fail-01",
    {"en": "Asian-Session Tweezer Top, Run Over at the London Open", "bn": "Asian session-এর tweezer top, London open-এ ভেঙে যায়"},
    "USDJPY", "H1", "bearish", "loss",
    ["tweezer-top", "tweezer", "candlestick", "fail", "session", "pattern"],
    {"en": "Illustrative synthetic USDJPY H1: after an uptrend, the quiet Asian session forms a small tweezer top at the top of its narrow range. The short on the low break fills, then the London open breaks the Asian high and runs through the stop.",
     "bn": "শিক্ষামূলক কাল্পনিক USDJPY H1: uptrend-এর পর শান্ত Asian session-এর সরু range-এর মাথায় ছোট tweezer top। Low ভাঙলে short fill হয়, তারপর London open Asian high ভেঙে stop পেরিয়ে যায়।"},
    {"en": "Candles 0-5 are an uptrend. Candles 6-14 are the quiet Asian session, with tiny ranges. Candles 11-12 make a tweezer top at the session high, but only a few pips tall and with no higher-timeframe level. Candle 13 fills the short. Candle 15, the London open, breaks the Asian high and takes the stop.",
     "bn": "০-৫ নম্বর candle uptrend। ৬-১৪ নম্বর শান্ত Asian session, খুব ছোট range। ১১-১২ নম্বর session high-এ tweezer top দেয়, কিন্তু মাত্র কয়েক pip উঁচু, আর কোনো higher timeframe level নেই। ১৩ নম্বর short fill করে। ১৫ নম্বর, London open, Asian high ভেঙে stop নেয়।"},
    [
        hline(high, "Asian high (equal highs)", BLUE, style="dotted"),
        marker(11, "Tweezer A", below=False),
        marker(12, "Tweezer B", below=False),
        marker(15, "London open"),
        hline(entry, "Entry (low break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A tweezer in a thin session is not a level; the next session decides", "bn": "পাতলা session-এর tweezer level নয়; পরের session সিদ্ধান্ত নেয়"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=13, expect="loss"))
