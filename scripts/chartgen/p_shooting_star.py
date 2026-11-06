from patgen import Builder, save, base_meta, hline, marker, check_trade, BLUE, GOLD, RED, GREEN

# ───────────── WIN: shooting star pierces an old high, short on the low break ─────────────
D = 1.0
b = Builder(start=2300.0, pip=D, seed=171, decimals=2)
b.walk([22, 30, -12, 28, 20])                                     # 0-4 rally
res = round(max(k["h"] for k in b.candles) + 2, 2)
o = b.last
b.add(o=o, h=res, l=o - 15, c=res - 22)                           # 5 old high
b.walk([-25, -32, -18, 10, -20])                                  # 6-10 pullback
pull_low = round(min(k["l"] for k in b.candles[6:11]), 2)
b.walk([24, 28, 18, 22])                                          # 11-14 rally back
o = b.last
assert o < res - 10, (o, res)
b.add(o=o, h=res - 4, l=o - 6, c=res - 9)                          # 15 arrives under the old high
o = b.last
ss_idx = b.add(o=o, h=res + 30, l=o - 2.5, c=o - 6)                 # 16 SHOOTING STAR
ss = b.candles[ss_idx]
entry = round(ss["l"] - 1.5, 2)
stop = round(ss["h"] + 3, 2)
target = round(entry - 2 * (stop - entry), 2)
b.add(o=ss["c"], h=ss["c"] + 4, l=entry - 12, c=entry - 8)         # 17 breaks the low
b.walk([-22, 10, -30, -18, 8, -26, -20, -15], wick=(0.15, 0.4))     # 18-25 decline
print("shooting star", ss, "res", res, "entry", entry, "stop", stop, "target", target,
      "pullback low", pull_low, "room R", round((entry - pull_low) / (stop - entry), 2))

meta = base_meta(
    "shooting-star-win-01",
    {"en": "Shooting Star Pierces an Old High, Short on the Low Break", "bn": "পুরোনো high ভেদ করা shooting star, low ভাঙলে short"},
    "XAUUSD", "D1", "bearish", "win",
    ["shooting-star", "candlestick", "resistance", "pattern"],
    {"en": "Illustrative synthetic XAUUSD D1: price rallies back to an old high and prints a shooting star whose upper wick pokes well above the level and closes near its low. The next candle breaks the low, filling a sell stop. Price falls to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক XAUUSD D1: দাম আবার পুরোনো high-এ ফিরে একটি shooting star দেয়: উপরের wick level-এর অনেক ওপারে যায়, close low-এর কাছে। পরের candle low ভাঙে, sell stop fill হয়। দাম 2R পর্যন্ত নামে।"},
    {"en": "Candle 5 makes the old high. Candles 11-15 rally back under it. Candle 16 is a shooting star: small body at the bottom, an upper wick far above the old high, almost no lower wick. Candle 17 breaks its low and fills the sell stop. The stop sits above the wick high; price reaches 2R.",
     "bn": "৫ নম্বর candle পুরোনো high বানায়। ১১-১৫ নম্বর আবার তার নিচে ওঠে। ১৬ নম্বর shooting star: নিচে ছোট body, পুরোনো high-এর অনেক উপরে লম্বা wick, নিচে wick প্রায় নেই। ১৭ নম্বর তার low ভেঙে sell stop fill করে। Stop wick-এর high-এর উপরে; দাম 2R পর্যন্ত নামে।"},
    [
        hline(res, "Old high (resistance)", BLUE),
        marker(16, "Shooting star", below=False),
        hline(entry, "Entry (low break)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A shooting star at a level has already closed the sellers' way", "bn": "Level-এ shooting star-এর close ইতিমধ্যে sellers-এর দিকে"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=17, expect="win"))

# ───────────── FAIL: right idea, stop hidden in the middle of the wick ─────────────
P = 0.01
b = Builder(start=150.80, pip=P, seed=173, decimals=3)
b.walk([25, 30, -10, 28, 22])                                      # 0-4 rally
res = round(max(k["h"] for k in b.candles) + 3 * P, 3)
o = b.last
b.add(o=o, h=res, l=o - 15 * P, c=res - 24 * P)                    # 5 old high
b.walk([-25, -30, -15, 12, -20])                                   # 6-10 pullback
b.walk([20, 26, 18])                                               # 11-13 rally back
o = b.last
b.add(o=o, h=res - 6 * P, l=o - 6 * P, c=res - 10 * P)              # 14 under the old high
o = b.last
ss_idx = b.add(o=o, h=res + 40 * P, l=o - 3 * P, c=o - 5 * P)        # 15 SHOOTING STAR
ss = b.candles[ss_idx]
entry = round(ss["l"] - 2 * P, 3)
wick_mid = round((ss["h"] + max(ss["o"], ss["c"])) / 2, 3)
stop = round(wick_mid, 3)                                           # tight stop mid-wick (the mistake)
target = round(entry - 2 * (stop - entry), 3)
b.add(o=ss["c"], h=ss["c"] + 3 * P, l=entry - 8 * P, c=entry - 5 * P)   # 16 breaks the low, fills
c = b.last
b.add(o=c, h=stop + 6 * P, l=c - 4 * P, c=c + 12 * P)                    # 17 retests into the wick, takes the tight stop
b.walk([-30, -35, 10, -40, -30, -25], wick=(0.15, 0.4))                  # 18-23 the idea works anyway
proper_stop = round(ss["h"] + 5 * P, 3)
proper_target = round(entry - 2 * (proper_stop - entry), 3)
won_at = check_trade(b.candles, entry=entry, stop=proper_stop, target=proper_target,
                     side="short", trigger_index=16, expect="win")
print("shooting star", ss, "entry", entry, "tight stop", stop, "target", target,
      "proper stop", proper_stop, "proper target", proper_target, "proper wins at", won_at)

meta = base_meta(
    "shooting-star-fail-01",
    {"en": "Shooting Star With the Stop Hidden Mid-Wick", "bn": "Wick-এর মাঝে লুকানো stop-সহ shooting star"},
    "USDJPY", "H4", "bearish", "loss",
    ["shooting-star", "candlestick", "fail", "stop-placement", "pattern"],
    {"en": "Illustrative synthetic USDJPY H4: a valid shooting star at an old high, short on the low break. The stop was placed in the middle of the upper wick to improve R:R. Price retests into the wick, takes that stop, then falls as the idea predicted.",
     "bn": "শিক্ষামূলক কাল্পনিক USDJPY H4: পুরোনো high-এ একটি সঠিক shooting star, low ভাঙলে short। R:R ভালো দেখাতে stop রাখা হয়েছিল উপরের wick-এর মাঝখানে। দাম wick-এ ফিরে সেই stop নেয়, তারপর ধারণা অনুযায়ী নিচে নামে।"},
    {"en": "Candle 15 is a clean shooting star at the old high, and candle 16 breaks its low. The stop sat at the middle of the wick instead of above its high. Candle 17 retests into the wick and takes that stop. A stop above the wick high would have survived, and price later reached that wider 2R target too.",
     "bn": "১৫ নম্বর পুরোনো high-এ পরিষ্কার shooting star, ১৬ নম্বর তার low ভাঙে। Stop wick-এর high-এর উপরে নয়, মাঝখানে ছিল। ১৭ নম্বর wick-এ ফিরে সেই stop নেয়। Wick high-এর উপরের stop টিকে যেত, আর দাম পরে সেই বড় 2R target-ও ছুঁয়েছে।"},
    [
        hline(res, "Old high (resistance)", BLUE),
        marker(15, "Shooting star", below=False),
        marker(17, "Retest takes tight stop", below=False),
        hline(entry, "Entry (low break)", GOLD),
        hline(stop, "Tight stop (mid-wick)", RED),
        hline(proper_stop, "Proper stop (above wick)", RED, style="dotted"),
        hline(target, "Target 2R (tight)", GREEN),
    ],
    {"en": "A stop inside the wick sits where price has already traded", "bn": "Wick-এর ভেতরের stop এমন জায়গায়, যেখানে দাম আগেই গেছে"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=16, expect="loss"))
