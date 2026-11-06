from patgen import Builder, save, base_meta, hline, marker, BLUE, GOLD, RED, GREEN

# ───────────── WIN: hanging man at an old high, short on the confirming close below its body ─────────────
D = 1.0
b = Builder(start=2410.0, pip=D, seed=131, decimals=2)
b.walk([9, 12, -4, 10, 8])                                        # 0-4 rally
res = round(max(k["h"] for k in b.candles) + 1.0, 2)
o = b.last
b.add(o=o, h=res, l=o - 6, c=res - 9)                             # 5 old high
b.walk([-10, -14, -8, 5, -9])                                     # 6-10 pullback
b.walk([9, 11, 7, 10])                                            # 11-14 rally back
o = b.last
gap = round(res - 4 - o, 2)
assert 0 < gap < 15, gap
b.add(o=o, h=res - 2, l=o - 3, c=res - 4)                          # 15 arrives under the old high
o = b.last
hm_idx = b.add(o=o, h=o + 3.2, l=o - 16, c=o + 2.6)                # 16 HANGING MAN (small body top, long lower wick)
hm = b.candles[hm_idx]
body_low = min(hm["o"], hm["c"])
c17 = round(body_low - 6.5, 2)
b.add(o=hm["c"], h=hm["c"] + 0.5, l=c17 - 1.5, c=c17)        # 17 confirmation: closes well below the body
entry = c17
stop = round(hm["h"] + 2.5, 2)
target = round(entry - 2 * (stop - entry), 2)
b.walk([-9, -12, 4, -10, -8, 3, -11, -7], wick=(0.15, 0.4))        # 18-25 decline
print("hanging man", hm, "res", res, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "hanging-man-win-01",
    {"en": "Hanging Man at an Old High, Short on the Confirming Close", "bn": "পুরোনো high-এ hanging man, body-র নিচে confirmation close-এ short"},
    "XAUUSD", "H4", "bearish", "win",
    ["hanging-man", "candlestick", "resistance", "confirmation", "pattern"],
    {"en": "Illustrative synthetic XAUUSD H4: price rallies back under an old high and prints a hanging man. The next candle closes well below the hanging man's body; the short is taken on that close. Price falls to 2R.",
     "bn": "শিক্ষামূলক কাল্পনিক XAUUSD H4: দাম আবার পুরোনো high-এর নিচে ফিরে একটি hanging man দেয়। পরের candle hanging man-এর body-র অনেক নিচে close করে; সেই close-এ short। দাম 2R পর্যন্ত নামে।"},
    {"en": "Candle 5 makes the old high. Candles 11-15 rally back under it. Candle 16 is a hanging man: small body at the top, lower wick about five times the body, almost no upper wick. Candle 17 closes well below its body, the confirmation. Short on that close, stop above the hanging man high; price reaches 2R.",
     "bn": "৫ নম্বর candle পুরোনো high বানায়। ১১-১৫ নম্বর আবার তার নিচে ওঠে। ১৬ নম্বর hanging man: উপরে ছোট body, নিচের wick body-র প্রায় পাঁচ গুণ, উপরে wick প্রায় নেই। ১৭ নম্বর তার body-র অনেক নিচে close করে, এটাই confirmation। সেই close-এ short, stop hanging man-এর high-এর উপরে; দাম 2R পর্যন্ত নামে।"},
    [
        hline(res, "Old high (resistance)", BLUE),
        marker(16, "Hanging man", below=False),
        marker(17, "Close below body", below=False),
        hline(entry, "Entry (confirming close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "A hanging man needs a bearish close below its body before it means anything", "bn": "Body-র নিচে bearish close না এলে hanging man কিছু বোঝায় না"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=17, expect="win"))

# ───────────── FAIL: hanging man shorted at its own close, no confirmation ─────────────
P = 0.01
b = Builder(start=153.40, pip=P, seed=137, decimals=3)
b.walk([12, 8, -5, 14, 10, -6, 12, 9, 11])                          # 0-8 steady uptrend
o = b.last
prior_high = max(k["h"] for k in b.candles)
hi = round(prior_high + 4 * P, 3)
hm_idx = b.add(o=o, h=hi, l=o - 22 * P, c=hi - 2 * P)               # 9 HANGING MAN at a new high
hm = b.candles[hm_idx]
entry = hm["c"]                                                     # short at the close (no confirmation)
stop = round(hm["h"] + 4 * P, 3)
target = round(entry - 2 * (stop - entry), 3)
b.add(o=hm["c"], h=stop + 3 * P, l=hm["c"] - 3 * P, c=hm["c"] + 6 * P)  # 10 closes ABOVE the body, breaks the stop
b.walk([10, 12, -4, 14], wick=(0.15, 0.4))                          # 11-14 uptrend continues through the stop
print("hanging man", hm, "entry", entry, "stop", stop, "target", target)

meta = base_meta(
    "hanging-man-fail-01",
    {"en": "Hanging Man Shorted Without Confirmation", "bn": "Confirmation ছাড়া hanging man-এ short"},
    "USDJPY", "H1", "bearish", "loss",
    ["hanging-man", "candlestick", "fail", "confirmation", "pattern"],
    {"en": "Illustrative synthetic USDJPY H1: a hanging man forms in a steady uptrend and is shorted at its close. The next candle closes above the hanging man's body instead of below it, and the uptrend carries on through the stop.",
     "bn": "শিক্ষামূলক কাল্পনিক USDJPY H1: একটানা uptrend-এ একটি hanging man, তার close-এই short। পরের candle body-র নিচে নয়, উপরে close করে, আর uptrend stop ভেঙে এগিয়ে যায়।"},
    {"en": "Candles 0-8 are a steady uptrend with no marked resistance. Candle 9 has the hanging man shape and the trader sells its close. Candle 10 closes above the hanging man body, the opposite of a confirmation. The same candle breaks the stop above the hanging man high, and the trend carries on.",
     "bn": "০-৮ নম্বর candle একটানা uptrend, কোনো চিহ্নিত resistance নেই। ৯ নম্বরের আকার hanging man, trader তার close-এই sell করেন। ১০ নম্বর hanging man-এর body-র উপরে close করে, confirmation-এর ঠিক উল্টো। একই candle hanging man-এর high-এর উপরের stop ভাঙে, trend এগিয়ে চলে।"},
    [
        marker(9, "Hanging man", below=False),
        marker(10, "Closes above body"),
        hline(entry, "Entry (at its close)", GOLD),
        hline(stop, "Stop", RED),
        hline(target, "Target 2R", GREEN),
    ],
    {"en": "No bearish close below the body, no trade", "bn": "Body-র নিচে bearish close নেই, trade নেই"},
)
save(meta, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=9, expect="loss"))
