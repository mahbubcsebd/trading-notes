from patgen import Builder, save, base_meta, hline, marker, check_trade, BLUE, GOLD, RED, GREEN

# ───────────── WIN: three inside down at an old high, short at the third close ─────────────
P = 0.01
b = Builder(start=149.00, pip=P, seed=491, decimals=3)
b.walk([12, 15, -4, 14, 10])                                       # 0-4 rally
res = round(max(k["h"] for k in b.candles) + 2 * P, 3)
o = b.last
b.add(o=o, h=res, l=o - 6 * P, c=res - 10 * P)                     # 5 old high
b.walk([-22, -28, -18, 6, -20, -14])                              # 6-11 pullback
swing_low = round(min(k["l"] for k in b.candles[6:12]), 3)
b.walk([24, 26, 20])                                               # 12-14 rally back
o = b.last
b.add(o=o, h=res - 1 * P, l=o - 1 * P, c=res - 3 * P)               # 15 MOTHER: long bullish into the old high
mo = b.candles[-1]
body = mo["c"] - mo["o"]
hbc = round(mo["c"] - 0.4 * body, 3)
b.add(o=mo["c"], h=mo["c"] + 0.6 * P, l=hbc - 1 * P, c=hbc)         # 16 HARAMI (small red inside)
hb = b.candles[-1]
c3c = round(mo["o"] - 3 * P, 3)
b.add(o=hb["c"], h=hb["c"] + 1 * P, l=c3c - 1 * P, c=c3c)            # 17 THIRD: closes below the mother's open
c3 = b.candles[-1]
entry = c3["c"]
stop = round(max(mo["h"], hb["h"]) + 4 * P, 3)
target = round(swing_low + 3 * P, 3)                               # just above the swing low
assert (entry - target) / (stop - entry) >= 1.5
b.add(o=c3["c"], h=c3["c"] + 2 * P, l=c3["c"] - 4 * P, c=c3["c"] - 2 * P)   # 18
b.walk([-14, 4, -16, -12, 3, -14, -10, -12, -8], wick=(0.15, 0.4))      # 19-27 decline
print("mother", mo, "harami", hb, "third", c3, "entry", entry, "stop", stop, "target", target,
      "swing low", swing_low, "room R", round((entry - swing_low) / (stop - entry), 2))

meta = base_meta(
    "three-inside-down-win-01",
    {"en": "Three Inside Down at an Old High, Short at the Third Close", "bn": "পুরোনো high-এ three inside down, তৃতীয় close-এ short"},
    "USDJPY", "H1", "bearish", "win",
    ["three-inside-down", "harami", "candlestick", "three-candle", "resistance", "pattern"],
    {"en": "Illustrative synthetic USDJPY H1: a long bullish candle into an old high, a small red harami inside it, then a third candle closing below the first candle's open. Short at the third close, stop above the mother's high; price falls to the target just above the swing low.",
     "bn": "শিক্ষামূলক কাল্পনিক USDJPY H1: পুরোনো high পর্যন্ত একটি লম্বা bullish candle, তার ভেতরে ছোট লাল harami, তারপর তৃতীয় candle প্রথমটার open-এর নিচে close করে। তৃতীয় close-এ short, stop mother-এর high-এর উপরে; দাম swing low-এর ঠিক উপরের target পর্যন্ত নামে।"},
    {"en": "Candle 5 makes the old high. Candle 15 is a long bullish mother into it; candle 16 is a small red harami inside its body. Candle 17 closes below candle 15's open: three inside down. Short at that close, stop above the mother's high.",
     "bn": "৫ নম্বর candle পুরোনো high বানায়। ১৫ নম্বর সেখানে লম্বা bullish mother; ১৬ নম্বর তার body-র ভেতরে ছোট লাল harami। ১৭ নম্বর ১৫ নম্বরের open-এর নিচে close করে: three inside down। সেই close-এ short, stop mother-এর high-এর উপরে।"},
    [
        hline(res, "Old high (resistance)", BLUE),
        marker(15, "Mother"),
        marker(16, "Harami", below=False),
        marker(17, "Close below mother open", below=False),
        hline(entry, "Entry (3rd close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target (above swing low)", GREEN),
    ],
    {"en": "Three inside down is a bearish harami that has already been confirmed", "bn": "Three inside down হলো ইতিমধ্যে নিশ্চিত হওয়া bearish harami"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=17, expect="win"))

# ───────────── FAIL: valid setup, stop buffer too tight, taken by a rollover spread spike ─────────────
P = 0.0001
b = Builder(start=1.0900, pip=P, seed=497)
b.walk([14, 18, -5, 16, 12])                                       # 0-4 rally
res = round(max(k["h"] for k in b.candles) + 2 * P, 4)
o = b.last
b.add(o=o, h=res, l=o - 8 * P, c=res - 12 * P)                     # 5 old high
b.walk([-15, -18, -10, 6, -12])                                    # 6-10 pullback
b.walk([14, 15, 11])                                               # 11-13 rally back
o = b.last
b.add(o=o, h=res - 1 * P, l=o - 1 * P, c=res - 3 * P)               # 14 MOTHER
mo = b.candles[-1]
body = mo["c"] - mo["o"]
hbc = round(mo["c"] - 0.4 * body, 5)
b.add(o=mo["c"], h=mo["c"] + 0.5 * P, l=hbc - 1 * P, c=hbc)         # 15 HARAMI
hb = b.candles[-1]
c3c = round(mo["o"] - 3 * P, 5)
b.add(o=hb["c"], h=hb["c"] + 1 * P, l=c3c - 1 * P, c=c3c)            # 16 THIRD
c3 = b.candles[-1]
entry = c3["c"]
tight_stop = round(max(mo["h"], hb["h"]) + 1 * P, 5)                # only 1 pip buffer (the mistake)
target = round(entry - 2 * (tight_stop - entry), 5)
c = c3["c"]
b.add(o=c, h=c + 3 * P, l=c - 6 * P, c=c - 4 * P)                    # 17 drifts lower
c = b.last
b.add(o=c, h=tight_stop + 1.5 * P, l=c - 2 * P, c=c + 1 * P)         # 18 ROLLOVER: thin spike takes the tight stop
c = b.last
b.walk([-14, -12, 4, -16, -10, -8], wick=(0.15, 0.4))                # 19-24 the idea works anyway
proper_stop = round(max(mo["h"], hb["h"]) + 6 * P, 5)
won = check_trade(b.candles, entry=entry, stop=proper_stop, target=round(entry - 2 * (proper_stop - entry), 5),
                  side="short", trigger_index=16, expect="win")
print("mother", mo, "harami", hb, "third", c3, "entry", entry, "tight stop", tight_stop, "target", target,
      "proper stop", proper_stop, "proper wins at", won)

meta = base_meta(
    "three-inside-down-fail-01",
    {"en": "Three Inside Down Stopped by a Rollover Spread Spike", "bn": "Rollover-এর spread spike-এ three inside down-এর stop"},
    "EURUSD", "H1", "bearish", "loss",
    ["three-inside-down", "harami", "candlestick", "three-candle", "fail", "spread", "pattern"],
    {"en": "Illustrative synthetic EURUSD H1: a clean three inside down at an old high, shorted at the third close with a stop only 1 pip above the mother's high. At the daily rollover, spreads widen and a thin spike takes the stop; price then falls as expected.",
     "bn": "শিক্ষামূলক কাল্পনিক EURUSD H1: পুরোনো high-এ পরিষ্কার three inside down, তৃতীয় close-এ short, stop mother-এর high-এর মাত্র 1 pip উপরে। Daily rollover-এ spread চওড়া হয়, একটি সরু spike stop নেয়; তারপর দাম প্রত্যাশামতো নামে।"},
    {"en": "Candles 14-16 form a clean three inside down at the old high. The stop sat just 1 pip above the mother's high. Candle 18 is the daily rollover hour, when spreads widen sharply: a thin spike touches the stop. Short trades are closed on the ask price, which rises with the spread. A buffer of about 6 pips would have survived and reached 2R.",
     "bn": "১৪-১৬ নম্বর candle পুরোনো high-এ পরিষ্কার three inside down। Stop ছিল mother-এর high-এর মাত্র 1 pip উপরে। ১৮ নম্বর daily rollover-এর ঘণ্টা, যখন spread হঠাৎ চওড়া হয়: একটি সরু spike stop ছোঁয়। Short trade ask দামে বন্ধ হয়, যা spread-এর সঙ্গে ওঠে। প্রায় 6 pip buffer থাকলে trade টিকে 2R ছুঁত।"},
    [
        hline(res, "Old high (resistance)", BLUE),
        marker(14, "Mother"),
        marker(15, "Harami", below=False),
        marker(16, "3rd", below=False),
        marker(18, "Rollover spike", below=False),
        hline(entry, "Entry (3rd close)", GOLD),
        hline(tight_stop, "Tight stop (+1 pip)", RED),
        hline(proper_stop, "Stop with buffer", RED, style="dotted"),
        hline(target, "Target 2R (tight)", GREEN),
    ],
    {"en": "Put the spread into the stop buffer, especially around rollover", "bn": "Stop-এর buffer-এ spread ধরুন, বিশেষ করে rollover-এর সময়"},
)
save(meta, b, trade=dict(entry=entry, stop=tight_stop, target=target, side="short", trigger_index=16, expect="loss"))
