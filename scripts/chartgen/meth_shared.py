"""Chapter 16 (Trading Methodologies) charts.

One synthetic XAUUSD H4 path (shared by every lesson, only annotations differ)
plus extra/failed examples that no existing chart covers (VSA, Harmonic).

Run: PYTHONIOENCODING=utf8 python scripts/chartgen/meth_shared.py
Synthetic data: there is no real XAUUSD OHLC history in the repo. Replace with
real data later (see docs/METHODOLOGY_SERIES_RULES.md section 6).
"""
import random

from patgen import BLUE, GOLD, GREEN, RED, Builder, hline, save

GREY = "#64748b"
VOL_COLOR = "#64748b"
MODULE = "16-trading-methodologies"
UPDATED = "2026-11-07T12:00:00Z"
NOTES = {
    "en": "Illustrative synthetic data (incl. synthetic tick volume), not a real market record.",
    "bn": "শিক্ষামূলক কাল্পনিক ডেটা (tick volume-ও কাল্পনিক), বাস্তব মার্কেটের রেকর্ড নয়।",
}

# (close, upper_wick, lower_wick, tick_volume); open = previous close.
START = 2400.0
SHARED = [
    # 0-16 downtrend, lower highs / lower lows
    (2394, 3, 2, 900), (2387, 2, 3, 950), (2391, 3, 2, 700), (2380, 2, 3, 1000),
    (2372, 2, 3, 1050), (2378, 3, 2, 750), (2369, 2, 3, 1100), (2360, 2, 3, 1150),
    (2365, 3, 2, 800), (2352, 2, 3, 1200), (2345, 2, 3, 1250), (2350, 3, 2, 850),
    (2338, 2, 3, 1300), (2330, 2, 3, 1350), (2334, 3, 2, 900), (2320, 2, 3, 1400),
    (2312, 2, 3, 1500),
    # 17 selling climax (SC): wide range, huge volume, close off the low
    (2306, 2, 10, 3200),
    # 18-21 automatic rally (AR)
    (2318, 2, 2, 1600), (2329, 2, 2, 1500), (2337, 2, 2, 1300), (2341, 3, 2, 1100),
    # 22-26 secondary test (ST) on lower volume
    (2333, 2, 2, 900), (2324, 2, 2, 800), (2316, 2, 2, 700), (2309, 2, 3, 600),
    (2311, 2, 3, 650),
    # 27-40 range, quiet volume
    (2318, 2, 2, 600), (2326, 2, 2, 650), (2333, 2, 2, 700), (2338, 4, 2, 750),
    (2330, 2, 2, 600), (2322, 2, 2, 550), (2315, 2, 2, 500), (2320, 2, 2, 520),
    (2328, 2, 2, 560), (2324, 2, 2, 500), (2316, 2, 2, 540), (2310, 2, 2, 580),
    (2306, 2, 2, 600), (2302, 2, 2, 650),
    # 41 spring: sweep below the SC low (2296), close back inside the range
    (2304, 2, 15, 1500),
    # 42 recovery, 43-44 test on very low volume
    (2312, 2, 2, 1100), (2309, 1, 8, 450), (2314, 2, 2, 500),
    # 45-49 sign of strength (SOS): break of the range top (~2342)
    (2322, 2, 2, 1400), (2333, 2, 2, 1900), (2346, 2, 2, 2400), (2356, 2, 2, 2200),
    (2362, 3, 2, 1800),
    # 50-54 last point of support (LPS) / wave 2, volume dries up
    (2356, 2, 2, 900), (2349, 2, 2, 800), (2343, 2, 2, 650), (2339, 2, 3, 600),
    (2347, 2, 2, 900),
    # 55-69 wave 3: strong, high volume
    (2356, 2, 2, 1500), (2366, 2, 2, 1800), (2378, 2, 2, 2100), (2372, 2, 2, 1200),
    (2385, 2, 2, 2000), (2398, 2, 2, 2400), (2392, 2, 2, 1300), (2406, 2, 2, 2300),
    (2418, 2, 2, 2600), (2412, 2, 2, 1400), (2425, 2, 2, 2200), (2436, 2, 2, 2400),
    (2430, 2, 2, 1300), (2441, 2, 2, 2000), (2450, 4, 2, 1900),
    # 70-77 wave 4: shallow, quiet
    (2444, 2, 2, 900), (2436, 2, 2, 850), (2441, 2, 2, 700), (2430, 2, 2, 800),
    (2424, 2, 2, 750), (2429, 2, 2, 650), (2421, 2, 3, 700), (2428, 2, 2, 700),
    # 78-88 wave 5: new highs on falling volume
    (2434, 2, 2, 1100), (2440, 2, 2, 1000), (2437, 2, 2, 800), (2447, 2, 2, 950),
    (2452, 2, 2, 850), (2449, 2, 2, 700), (2458, 2, 2, 800), (2463, 2, 2, 700),
    (2460, 2, 2, 600), (2468, 2, 2, 650), (2471, 3, 2, 600),
    # 89 upthrust / buy-side sweep: above the highs, closes near the low, big volume
    (2467, 16, 2, 2600),
    # 90-92 weak bounce
    (2458, 2, 2, 1400), (2462, 2, 2, 800), (2452, 2, 2, 1500),
    # 93-103 drop, breaks the wave-4 low (~2418) = change of character
    (2444, 2, 2, 1600), (2436, 2, 2, 1700), (2440, 2, 2, 900), (2428, 2, 2, 1800),
    (2415, 2, 2, 2000), (2420, 2, 2, 900), (2410, 2, 2, 1700), (2402, 2, 2, 1600),
    (2408, 2, 2, 800), (2398, 2, 2, 1500), (2394, 2, 2, 1300),
]

# Key bar indices on the shared path (asserted below against the data).
IX = dict(sc=17, ar=21, st=25, spring=41, test=43, sos=47, fvg_mid=47, lps=53,
          w3=69, w4=76, w5=88, ut=89, choch=97)


def build_shared():
    b = Builder(start=START, pip=1.0, seed=16, decimals=2)
    vols = []
    o = START
    for c, uw, dw, v in SHARED:
        b.add(o=o, h=max(o, c) + uw, l=min(o, c) - dw, c=c)
        vols.append(v)
        o = c
    return b, vols


def ema(values, n):
    k = 2 / (n + 1)
    out, cur = [], None
    for i, x in enumerate(values):
        cur = x if cur is None else x * k + cur * (1 - k)
        out.append(round(cur, 2) if i >= n - 1 else None)
    return out


def rsi(values, n=14):
    out = [None] * len(values)
    gains = losses = 0.0
    for i in range(1, len(values)):
        d = values[i] - values[i - 1]
        g, l = max(d, 0), max(-d, 0)
        if i <= n:
            gains += g
            losses += l
            if i == n:
                gains, losses = gains / n, losses / n
                out[i] = round(100 - 100 / (1 + gains / (losses or 1e-9)), 1)
            continue
        gains = (gains * (n - 1) + g) / n
        losses = (losses * (n - 1) + l) / n
        out[i] = round(100 - 100 / (1 + gains / (losses or 1e-9)), 1)
    return out


def profile(candles, vols, lo_i, hi_i, va=0.70):
    """Volume-at-price ($1 bins) for bars lo_i..hi_i; returns POC, VAH, VAL."""
    bins = {}
    for k, v in zip(candles[lo_i:hi_i + 1], vols[lo_i:hi_i + 1]):
        lo, hi = int(k["l"]), int(k["h"])
        share = v / (hi - lo + 1)
        for p in range(lo, hi + 1):
            bins[p] = bins.get(p, 0) + share
    poc = max(bins, key=bins.get)
    total, inside = sum(bins.values()), bins[poc]
    up = dn = poc
    while inside < total * va:
        nxt_up, nxt_dn = bins.get(up + 1, 0), bins.get(dn - 1, 0)
        if nxt_up >= nxt_dn:
            up += 1
            inside += nxt_up
        else:
            dn -= 1
            inside += nxt_dn
    return poc, up, dn


def check_shared(c):
    lo = lambda i: c[i]["l"]
    hi = lambda i: c[i]["h"]
    assert lo(IX["spring"]) < lo(IX["sc"]) < min(lo(i) for i in range(18, 41)), "spring must sweep SC low"
    assert c[IX["spring"]]["c"] > lo(IX["sc"]), "spring closes back inside"
    range_top = max(hi(i) for i in range(18, 41))
    assert c[IX["sos"]]["c"] > range_top, "SOS closes above range top"
    assert hi(IX["sos"] - 1) < lo(IX["sos"] + 1), "FVG exists around SOS bar"
    w1 = hi(49) - lo(IX["spring"])
    w3 = hi(IX["w3"]) - lo(IX["lps"])
    w5 = hi(IX["w5"]) - lo(IX["w4"])
    assert lo(IX["lps"]) > lo(IX["spring"]), "wave 2 above wave 1 start"
    assert w3 > w1 and w3 > w5, "wave 3 not the shortest"
    assert lo(IX["w4"]) > hi(49), "wave 4 does not overlap wave 1"
    assert hi(IX["ut"]) > max(hi(i) for i in range(0, IX["ut"])), "upthrust makes the high"
    assert c[IX["choch"]]["c"] < lo(IX["w4"]), "CHoCH closes below wave-4 low"
    return range_top, w1, w3, w5


def meta(cid, title, bias, outcome, tags, caption, explanation, annotations, takeaway,
         lessons, ctype="concept", tf="H4", symbol="XAUUSD"):
    return {
        "id": cid, "title": title, "symbol": symbol, "timeframe": tf,
        "mode": "synthetic", "type": ctype, "bias": bias, "outcome": outcome,
        "tags": tags, "module": MODULE, "lessonSlugs": lessons,
        "caption": caption, "notes": NOTES, "updatedAt": UPDATED,
        "annotations": annotations, "explanation": explanation,
        "keyTakeaways": [takeaway], "overwrite": True,
    }


def mk(i, text, below=True, shape=None):
    shape = shape or ("arrowUp" if below else "arrowDown")
    return {"type": "marker", "i": i, "position": "belowBar" if below else "aboveBar",
            "shape": shape, "text": text}


def zone(i0, p0, i1, p1, label, color):
    return {"type": "zone", "from": {"i": i0, "price": p0}, "to": {"i": i1, "price": p1},
            "label": label, "color": color}


def tline(i0, p0, i1, p1, label, color=GOLD, style="solid"):
    return {"type": "trendline", "from": {"i": i0, "price": p0}, "to": {"i": i1, "price": p1},
            "label": label, "color": color, "style": style}


def vol_pane(vols):
    return {"title": "Tick volume (synthetic)",
            "series": [{"label": "Volume", "kind": "histogram", "color": VOL_COLOR, "values": vols}]}


def shared_charts():
    b, vols = build_shared()
    c = b.candles
    range_top, w1, w3, w5 = check_shared(c)
    closes = [k["c"] for k in c]
    r = rsi(closes)
    poc, vah, val = profile(c, vols, IX["sc"], IX["test"] + 1)
    print("range_top", range_top, "w1", w1, "w3", w3, "w5", w5)
    print("profile range POC/VAH/VAL", poc, vah, val)
    print("RSI at w3/w5 peaks", r[IX["w3"]], r[IX["w5"]], "ut", r[IX["ut"]])
    assert r[IX["w5"]] < r[IX["w3"]], "need bearish RSI divergence"
    sc_low, spring_low = c[IX["sc"]]["l"], c[IX["spring"]]["l"]
    lessons = ["00-overview"]
    vp = vol_pane(vols)
    T = lambda en, bn: {"en": en, "bn": bn}

    def emit(cid, title, caption, expl, ann, takeaway, lesson, pane=vp, overlays=None,
             bias="neutral"):
        m = meta(cid, title, bias, None, ["XAUUSD", "methodology", "shared-chart"], caption,
                 expl, ann, takeaway, [lesson])
        m["pane"] = pane
        if overlays:
            m["overlays"] = overlays
        save(m, b)

    emit("meth-shared-base",
         T("Shared chart: one path, eight lenses", "Shared chart: এক path, আট লেন্স"),
         T("XAUUSD H4 (synthetic): downtrend, a long range, a sharp rally in steps, a spike above the highs, then a drop.",
           "XAUUSD H4 (কাল্পনিক): downtrend, লম্বা range, ধাপে ধাপে তীব্র rally, high-এর ওপরে এক spike, তারপর পতন।"),
         T("Every lesson in chapter 16 reads this same chart with its own method.",
           "অধ্যায় ১৬-এর প্রতিটি পাঠ এই একই chart নিজের পদ্ধতিতে পড়ে।"),
         [], T("Same data, different questions", "একই ডেটা, ভিন্ন প্রশ্ন"), "00-overview")

    emit("meth-pa-shared",
         T("Price Action reading of the shared chart", "Shared chart: Price Action-এর চোখে"),
         T("Lower highs end in a range; the false break below support and the close back inside, then the breakout and retest of the range top.",
           "Lower high-এর সারি range-এ থামে; support-এর নিচে false break ও ভেতরে close, তারপর range top-এর breakout ও retest।"),
         T("Price Action reads structure, levels and candle behaviour at those levels.",
           "Price Action পড়ে structure, level আর সেই level-এ candle-এর আচরণ।"),
         [tline(0, c[0]["h"], 13, c[13]["h"] + 1, "Lower highs", RED, "dashed"),
          zone(IX["sc"], range_top, IX["test"] + 1, sc_low, "Range", GREY),
          mk(IX["spring"], "False break"), mk(IX["sos"], "Breakout", below=False),
          mk(IX["lps"], "Retest"), mk(IX["ut"], "Rejection wick", below=False)],
         T("Read levels first, candles second", "আগে level, তারপর candle"), "01-price-action")

    emit("meth-ind-shared",
         T("Indicator reading of the shared chart", "Shared chart: Indicator-এর চোখে"),
         T("EMA 20 crosses above EMA 50 about ten bars after the breakout; RSI makes a lower high at the final price high (bearish divergence); after the drop the EMAs have still not crossed down.",
           "EMA 20, EMA 50-কে পেরোয় breakout-এর প্রায় দশ bar পরে; শেষ price high-এ RSI lower high দেয় (bearish divergence); নামার পরও EMA দুটি এখনো নিচে cross করেনি।"),
         T("Indicators summarise price with formulas; they confirm late and whipsaw in ranges.",
           "Indicator সূত্র দিয়ে দামকে সংক্ষেপ করে; দেরিতে নিশ্চিত করে, range-এ whipsaw দেয়।"),
         [mk(57, "EMA cross up"), mk(IX["w3"], "RSI high", below=False),
          mk(IX["w5"], "RSI lower high", below=False), mk(103, "EMA still bullish", below=False),
          zone(IX["sc"], range_top, IX["test"] + 1, sc_low, "Range (EMA 50 not formed yet)", GREY)],
         T("Indicators confirm; they do not predict", "Indicator নিশ্চিত করে, ভবিষ্যৎ বলে না"),
         "02-indicator-based-trading",
         pane={"title": "RSI 14", "range": [0, 100], "levels": [30, 70],
               "series": [{"label": "RSI", "color": GOLD, "values": r}]},
         overlays=[{"label": "EMA 20", "color": BLUE, "values": ema(closes, 20)},
                   {"label": "EMA 50", "color": "#a855f7", "values": ema(closes, 50)}])

    emit("meth-wyckoff-shared",
         T("Wyckoff reading of the shared chart", "Shared chart: Wyckoff-এর চোখে"),
         T("Accumulation schematic: selling climax, automatic rally, secondary test, spring below the SC low, sign of strength, last point of support.",
           "Accumulation schematic: selling climax, automatic rally, secondary test, SC low-এর নিচে spring, sign of strength, last point of support।"),
         T("Wyckoff reads the range as a campaign: who absorbs supply, and when demand takes over.",
           "Wyckoff range-কে একটি campaign হিসেবে পড়ে: কে supply শুষে নিচ্ছে, কখন demand দখল নিচ্ছে।"),
         [mk(IX["sc"], "SC"), mk(IX["ar"], "AR", below=False), mk(IX["st"], "ST"),
          mk(IX["spring"], "Spring"), mk(IX["sos"], "SOS", below=False), mk(IX["lps"], "LPS")],
         T("Sequence matters more than any single bar", "একটি bar নয়, ক্রমটাই আসল"),
         "03-wyckoff-method", bias="bullish")

    emit("meth-vsa-shared",
         T("VSA reading of the shared chart", "Shared chart: VSA-র চোখে"),
         T("Bar by bar: stopping volume at the low, a low-volume test after the spring, no demand on the last push up, an upthrust at the top.",
           "Bar ধরে ধরে: low-এ stopping volume, spring-এর পর কম volume-এর test, শেষ ওঠায় no demand, চূড়ায় upthrust।"),
         T("VSA compares each bar's spread, close and volume with the bars around it.",
           "VSA প্রতিটি bar-এর spread, close আর volume আশপাশের bar-এর সাথে তুলনা করে।"),
         [mk(IX["sc"], "Stopping volume"), mk(IX["test"], "Test (low vol)"),
          mk(IX["sos"], "Wide up, high vol", below=False), mk(IX["w5"], "No demand", below=False),
          mk(IX["ut"], "Upthrust", below=False)],
         T("Volume only means something relative to spread and close", "Volume-এর অর্থ spread আর close-এর তুলনায়"),
         "04-volume-spread-analysis")

    emit("meth-vp-shared",
         T("Volume Profile reading of the shared chart", "Shared chart: Volume Profile-এর চোখে"),
         T(f"Range profile (bars {IX['sc']}–{IX['test'] + 1}): POC {poc}, value area {val}–{vah}. The fast rally above left a low-volume area.",
           f"Range profile (bar {IX['sc']}–{IX['test'] + 1}): POC {poc}, value area {val}–{vah}। ওপরের দ্রুত rally একটি low-volume এলাকা রেখে গেছে।"),
         T("Volume Profile asks where trading was accepted (high volume) and where price moved through fast (low volume).",
           "Volume Profile জিজ্ঞেস করে কোথায় trading গৃহীত হয়েছে (বেশি volume) আর কোথায় দাম দ্রুত পার হয়েছে (কম volume)।"),
         [hline(poc, f"POC {poc}", GOLD, "solid"), hline(vah, f"VAH {vah}", GREY),
          hline(val, f"VAL {val}", GREY),
          zone(IX["w3"] - 12, 2405, IX["w3"] - 7, 2380, "LVN (fast move)", BLUE),
          mk(IX["spring"], "Below VAL, back in")],
         T("Value area = where the market agreed on price", "Value area = যেখানে মার্কেট দামে একমত"),
         "05-volume-profile")

    fvg_lo, fvg_hi = c[IX["sos"] - 1]["h"], c[IX["sos"] + 1]["l"]
    ob = c[IX["test"]]
    emit("meth-smc-shared",
         T("SMC/ICT reading of the shared chart", "Shared chart: SMC/ICT-এর চোখে"),
         T("Sell-side liquidity below the range is swept, a bullish break of structure leaves a fair value gap, price returns to it; at the top buy-side liquidity is swept and a bearish CHoCH follows.",
           "Range-এর নিচের sell-side liquidity sweep, bullish BOS একটি FVG রেখে যায়, দাম তাতে ফেরে; চূড়ায় buy-side liquidity sweep, তারপর bearish CHoCH।"),
         T("SMC tells a story of liquidity: where stops rest, who takes them, and where price is 'delivered' next.",
           "SMC liquidity-র গল্প বলে: stop কোথায় জমে, কে নেয়, আর দাম এরপর কোথায় 'deliver' হয়।"),
         [mk(IX["spring"], "SSL sweep"), mk(IX["sos"], "BOS", below=False),
          zone(IX["sos"] - 1, fvg_hi, IX["lps"] + 2, fvg_lo, "FVG", BLUE),
          zone(IX["test"], ob["h"], IX["sos"] - 2, ob["l"], "OB", GREEN),
          mk(IX["ut"], "BSL sweep", below=False), mk(IX["choch"], "CHoCH", below=False)],
         T("Liquidity first, then structure, then the entry zone", "আগে liquidity, তারপর structure, তারপর entry zone"),
         "06-smc-ict")

    emit("meth-ew-shared",
         T("Elliott Wave reading of the shared chart", "Shared chart: Elliott Wave-এর চোখে"),
         T("One possible count: impulse 1-2-3-4-5 from the spring low; wave 3 longest, wave 4 stays above wave 1's high. A-B-C correction starts after the top.",
           "একটি সম্ভাব্য count: spring low থেকে impulse 1-2-3-4-5; wave 3 সবচেয়ে লম্বা, wave 4 wave 1-এর high-এর ওপরে। চূড়ার পর A-B-C correction শুরু।"),
         T("Elliott reads crowd psychology as repeating wave shapes, with three hard rules and many guidelines.",
           "Elliott ভিড়ের মনস্তত্ত্বকে পুনরাবৃত্ত wave আকারে পড়ে: তিনটি কঠোর নিয়ম, অনেক নির্দেশিকা।"),
         [mk(49, "1", below=False, shape="circle"), mk(IX["lps"], "2", shape="circle"),
          mk(IX["w3"], "3", below=False, shape="circle"), mk(IX["w4"], "4", shape="circle"),
          mk(IX["w5"], "5", below=False, shape="circle"),
          hline(spring_low, f"Invalidation {spring_low}", RED)],
         T("A count is a hypothesis with an invalidation level", "Count একটি অনুমান, যার invalidation level আছে"),
         "07-elliott-wave", bias="bullish")

    xa = c[IX["w3"]]["h"] - c[IX["lps"]]["l"]
    ab = c[IX["w3"]]["h"] - c[IX["w4"]]["l"]
    ab_ratio = round(ab / xa, 2)
    print("harmonic candidate AB/XA", ab_ratio)
    assert ab_ratio < 0.382, "candidate must fail the B-point rule (honest no-pattern example)"
    emit("meth-harm-shared",
         T("Harmonic check on the shared chart", "Shared chart-এ Harmonic যাচাই"),
         T(f"Closest candidate X-A-B-C-D at the top: B retraces only {ab_ratio} of XA, outside Gartley (0.618) and Bat (0.382–0.50). No valid pattern.",
           f"চূড়ার কাছে সবচেয়ে কাছের X-A-B-C-D: B মাত্র XA-র {ab_ratio} retrace করেছে, Gartley (0.618) ও Bat (0.382–0.50)-এর বাইরে। বৈধ pattern নেই।"),
         T("Harmonic trading measures ratios; when the ratios fail, there is no pattern, however it looks.",
           "Harmonic ratio মাপে; ratio না মিললে দেখতে যেমনই হোক, pattern নেই।"),
         [tline(IX["lps"], c[IX["lps"]]["l"], IX["w3"], c[IX["w3"]]["h"], "XA"),
          tline(IX["w3"], c[IX["w3"]]["h"], IX["w4"], c[IX["w4"]]["l"], f"AB {ab_ratio}", RED),
          tline(IX["w4"], c[IX["w4"]]["l"], IX["ut"], c[IX["ut"]]["h"], "BC→D", GREY, "dashed"),
          mk(IX["w4"], "B fails", shape="circle")],
         T("Measure before you label", "লেবেলের আগে মাপুন"),
         "08-harmonic-patterns")
    return poc, vah, val


# ---------- extra / failed examples (VSA, Harmonic) ----------

def path(b, vols, points, rng, base_vol=700):
    """Walk through (bars, target_extreme, vol) legs; each leg's last bar touches target exactly."""
    for bars, target, vol in points:
        start = b.last
        up = target > start
        for j in range(1, bars + 1):
            frac = j / bars
            c = start + (target - start) * frac
            o = b.last
            if j == bars:
                h = target if up else max(o, c) + 1
                l = min(o, c) - 1 if up else target
                c = target - 1.5 if up else target + 1.5
            else:
                c += rng.uniform(-1.5, 1.5)
                h, l = max(o, c) + rng.uniform(0.5, 2), min(o, c) - rng.uniform(0.5, 2)
            b.add(o=o, h=max(h, o, c), l=min(l, o, c), c=c)
            vols.append(int(vol * rng.uniform(0.85, 1.15)) if vol else int(base_vol * rng.uniform(0.8, 1.2)))
    return b


def harmonic_examples():
    T = lambda en, bn: {"en": en, "bn": bn}
    # Bullish Gartley: X=2300, A=2380, B=0.618 XA, C=0.618 AB, D=0.786 XA.
    rng = random.Random(81)
    b, vols = Builder(start=2320, pip=1.0, seed=81, decimals=2), []
    X, A = 2300.0, 2380.0
    B = round(A - 0.618 * (A - X), 1)
    C = round(B + 0.618 * (A - B), 1)
    D = round(A - 0.786 * (A - X), 1)
    path(b, vols, [(6, X, 0), (12, A, 0), (8, B, 0), (6, C, 0), (8, D, 0)], rng)
    d_i = b.n - 1
    entry = round(D + 1.5, 1)
    stop = round(X - 4, 1)
    target = round(D + 0.618 * (A - D), 1)
    path(b, vols, [(4, D + 12, 0), (8, target + 6, 0)], rng)
    i = {"X": 5, "A": 17, "B": 25, "C": 31, "D": d_i}
    cd_bc = round((C - D) / (C - B), 2)
    print("gartley B C D", B, C, D, "CD/BC", cd_bc)
    m = meta("meth-harm-ex-01", T("Bullish Gartley completes at D", "Bullish Gartley D-তে সম্পূর্ণ"), "bullish", "win",
             ["XAUUSD", "harmonic", "gartley"],
             T(f"XAUUSD H1 (synthetic): B = 0.618 XA, C = 0.618 AB, D = 0.786 XA at {D}, CD = {cd_bc} × BC. Buy near D, stop below X, target 0.618 of AD.",
               f"XAUUSD H1 (কাল্পনিক): B = XA-র 0.618, C = AB-র 0.618, D = XA-র 0.786 ({D}), CD = BC-র {cd_bc} গুণ। D-র কাছে buy, stop X-এর নিচে, target AD-র 0.618।"),
             T("Every point is measured before the trade; the stop sits where the pattern is invalid (below X).",
               "Trade-এর আগে প্রতিটি point মাপা; stop সেখানে যেখানে pattern বাতিল (X-এর নিচে)।"),
             [tline(i["X"], X, i["A"], A, "XA"), tline(i["A"], A, i["B"], B, "0.618"),
              tline(i["B"], B, i["C"], C, "0.618"), tline(i["C"], C, i["D"], D, "D 0.786 XA"),
              mk(i["D"], "Buy at D"), hline(stop, f"Stop {stop}", RED)],
             T("Ratios first, entry at D, stop beyond X", "আগে ratio, D-তে entry, X-এর বাইরে stop"),
             ["08-harmonic-patterns"], ctype="trade-setup", tf="H1")
    save(m, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=d_i, expect="win"))

    # Bearish Bat that fails: X=2420 high, A=2340, B=0.5 XA, C=0.618 AB, D=0.886 XA.
    rng = random.Random(82)
    b, vols = Builder(start=2400, pip=1.0, seed=82, decimals=2), []
    X, A = 2420.0, 2340.0
    B = round(A + 0.5 * (X - A), 1)
    C = round(B - 0.618 * (B - A), 1)
    D = round(A + 0.886 * (X - A), 1)
    path(b, vols, [(6, X, 0), (12, A, 0), (8, B, 0), (6, C, 0), (8, D, 0)], rng)
    d_i = b.n - 1
    entry = round(D - 1.5, 1)
    stop = round(X + 4, 1)
    target = round(D - 0.618 * (D - A), 1)
    path(b, vols, [(3, D - 8, 0), (9, X + 20, 0)], rng)
    i = {"X": 5, "A": 17, "B": 25, "C": 31, "D": d_i}
    print("bat B C D", B, C, D)
    m = meta("meth-harm-fail-01", T("Bearish Bat fails: price runs through X", "Bearish Bat ব্যর্থ: দাম X পেরিয়ে যায়"), "bearish", "loss",
             ["XAUUSD", "harmonic", "bat", "failure"],
             T(f"XAUUSD H1 (synthetic): textbook Bat ratios, sell at D ({D}), but buying keeps going; price breaks X and the stop at {stop} is hit.",
               f"XAUUSD H1 (কাল্পনিক): বইয়ের মতো Bat ratio, D-তে ({D}) sell, কিন্তু কেনা থামে না; দাম X ভাঙে, {stop}-এ stop লাগে।"),
             T("Perfect ratios are not a reason for price to turn. The trend context was strongly up.",
               "নিখুঁত ratio দাম ঘোরার কারণ নয়। Trend-এর প্রেক্ষাপট ছিল জোরালো ওপরে।"),
             [tline(i["X"], X, i["A"], A, "XA"), tline(i["A"], A, i["B"], B, "0.5"),
              tline(i["B"], B, i["C"], C, "0.618"), tline(i["C"], C, i["D"], D, "D 0.886 XA"),
              mk(i["D"], "Sell at D", below=False), hline(stop, f"Stop {stop}", RED)],
             T("A pattern is invalid the moment X breaks", "X ভাঙলেই pattern বাতিল"),
             ["08-harmonic-patterns"], ctype="trade-setup", tf="H1")
    save(m, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=d_i, expect="loss"))


def vsa_examples():
    T = lambda en, bn: {"en": en, "bn": bn}
    # Win: shakeout on high volume, then a no-supply test on tiny volume, then markup.
    rng = random.Random(41)
    b, vols = Builder(start=2350, pip=1.0, seed=41, decimals=2), []
    path(b, vols, [(10, 2318, 900), (8, 2334, 600), (6, 2322, 500)], rng)
    o = b.last
    shake = b.add(o=o, h=o + 2, l=2308, c=2321)          # shakeout: new low, close high, big volume
    vols.append(2600)
    o = b.last
    b.add(o=o, h=o + 6, l=o - 1, c=o + 5)
    vols.append(1200)
    o = b.last
    test = b.add(o=o, h=o + 1, l=o - 7, c=o - 1)         # test: narrow, dips, very low volume
    vols.append(300)
    entry = round(b.last + 1, 1)
    stop = 2305.0
    target = round(entry + 2.5 * (entry - stop), 1)
    path(b, vols, [(4, entry + 4, 1400), (12, target + 4, 1600)], rng)
    m = meta("meth-vsa-ex-01", T("Shakeout, then a no-supply test", "Shakeout, তারপর no-supply test"), "bullish", "win",
             ["XAUUSD", "vsa", "test", "shakeout"],
             T(f"XAUUSD H1 (synthetic): a new low on very high volume closes near its high (shakeout); two bars later a narrow down bar on the lowest volume (test). Buy above the test, stop {stop}.",
               f"XAUUSD H1 (কাল্পনিক): খুব বেশি volume-এ নতুন low, কিন্তু close high-এর কাছে (shakeout); দুই bar পরে সবচেয়ে কম volume-এ সরু down bar (test)। Test-এর ওপরে buy, stop {stop}।"),
             T("High volume with a high close says supply was absorbed; the quiet test says sellers are gone.",
               "বেশি volume-এ উঁচু close মানে supply শুষে নেওয়া হয়েছে; শান্ত test মানে seller চলে গেছে।"),
             [mk(shake, "Shakeout (high vol)"), mk(test, "Test (low vol)"),
              hline(stop, f"Stop {stop}", RED)],
             T("Read volume against spread and close", "Volume পড়ুন spread ও close-এর সাথে"),
             ["04-volume-spread-analysis"], ctype="trade-setup", tf="H1")
    m["pane"] = vol_pane(vols)
    save(m, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=test + 1, expect="win"))

    # Fail: "upthrust" sold inside a strong uptrend; demand returns and the stop is hit.
    rng = random.Random(42)
    b, vols = Builder(start=2300, pip=1.0, seed=42, decimals=2), []
    path(b, vols, [(14, 2360, 1500), (4, 2350, 700), (6, 2372, 1400)], rng)
    o = b.last
    ut = b.add(o=o, h=o + 9, l=o - 2, c=o - 1)
    vols.append(2100)
    entry = round(b.last - 1, 1)
    stop = round(o + 13, 1)
    target = round(entry - 2 * (stop - entry), 1)
    path(b, vols, [(2, entry - 5, 900), (8, stop + 10, 1800)], rng)
    m = meta("meth-vsa-fail-01", T("Upthrust sell against a strong trend", "শক্ত trend-এর বিপরীতে upthrust sell"), "bearish", "loss",
             ["XAUUSD", "vsa", "upthrust", "failure"],
             T(f"XAUUSD H1 (synthetic): an upthrust-looking bar in a strong uptrend; the sell at {entry} fails as wide up bars on rising volume return; stop {stop} hit.",
               f"XAUUSD H1 (কাল্পনিক): শক্ত uptrend-এ upthrust-এর মতো একটি bar; {entry}-এ sell ব্যর্থ, বাড়তি volume-এ চওড়া up bar ফিরে আসে; stop {stop} লাগে।"),
             T("One bar does not reverse a trend. VSA signals need background: was there weakness before?",
               "একটি bar trend ঘোরায় না। VSA সংকেতের background লাগে: আগে দুর্বলতা ছিল কি?"),
             [mk(ut, "Upthrust?", below=False), hline(stop, f"Stop {stop}", RED)],
             T("Background first, then the signal bar", "আগে background, তারপর signal bar"),
             ["04-volume-spread-analysis"], ctype="trade-setup", tf="H1")
    m["pane"] = vol_pane(vols)
    save(m, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=ut + 1, expect="loss"))


if __name__ == "__main__":
    shared_charts()
    harmonic_examples()
    vsa_examples()
