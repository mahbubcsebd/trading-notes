"""Chapter 19 (SMC / ICT deep dive) charts. Synthetic XAUUSD H1.

Run: PYTHONIOENCODING=utf8 python scripts/chartgen/smc_series.py
Every chart is illustrative synthetic data (labelled in the lesson caption).
Trade charts assert entry fill and win/loss outcome (patgen.check_trade).
"""
import random

from patgen import BLUE, GOLD, GREEN, RED, Builder, hline, save
from meth_shared import GREY, mk, path, zone, tline, meta as _meta

MODULE = "19-smc-ict"
T = lambda en, bn: {"en": en, "bn": bn}


def meta(*a, **k):
    m = _meta(*a, **k)
    m["module"] = MODULE
    m["updatedAt"] = "2026-11-07T18:00:00Z"
    return m


def new(seed, start):
    return Builder(start=start, pip=1.0, seed=seed, decimals=2), [], random.Random(seed)


def leg(b, v, rng, n, target):
    i0 = b.n
    path(b, v, [(n, target, 0)], rng)
    return i0, b.n - 1


def hi_idx(b, i0, i1):
    return max(range(i0, i1 + 1), key=lambda i: b.candles[i]["h"])


def lo_idx(b, i0, i1):
    return min(range(i0, i1 + 1), key=lambda i: b.candles[i]["l"])


def first_close(b, start, above=None, below=None):
    for i in range(start, b.n):
        c = b.candles[i]["c"]
        if (above is not None and c > above) or (below is not None and c < below):
            return i
    raise AssertionError("no close beyond level")


# ───────────────────────── 01 market structure ─────────────────────────
def ms_charts():
    b, v, rng = new(171, 2300)
    _, e = leg(b, v, rng, 8, 2330); h1 = hi_idx(b, 0, e)
    s, e = leg(b, v, rng, 5, 2318); l1 = lo_idx(b, s, e)
    s, e = leg(b, v, rng, 8, 2350); h2 = hi_idx(b, s, e)
    bos1 = first_close(b, l1, above=b.candles[h1]["h"])
    s, e = leg(b, v, rng, 5, 2336); hl2 = lo_idx(b, s, e)
    s, e = leg(b, v, rng, 8, 2368); h3 = hi_idx(b, s, e)
    bos2 = first_close(b, hl2, above=b.candles[h2]["h"])
    s, e = leg(b, v, rng, 5, 2352); hl3 = lo_idx(b, s, e)
    s, e = leg(b, v, rng, 4, 2362); lh = hi_idx(b, s, e)
    assert b.candles[lh]["h"] < b.candles[h3]["h"], "lower high"
    hl3_low = b.candles[hl3]["l"]
    leg(b, v, rng, 6, 2344)
    choch = first_close(b, lh, below=hl3_low)
    leg(b, v, rng, 4, 2335)
    print("ms-01 idx", dict(h1=h1, bos1=bos1, h2=h2, bos2=bos2, h3=h3, hl3=hl3, lh=lh, choch=choch))
    m = meta("smc-ms-01", T("Market structure: BOS in the trend, CHoCH at the turn", "Market structure: trend-এ BOS, ঘোরার মুখে CHoCH"),
             "neutral", None, ["XAUUSD", "smc", "bos", "choch", "market-structure"],
             T("XAUUSD H1 (synthetic): higher highs and higher lows, each new high confirmed by a close above the previous one (BOS). The first close below the last higher low is the CHoCH.",
               "XAUUSD H1 (কাল্পনিক): higher high ও higher low, প্রতিটি নতুন high আগের high-এর ওপরে close দিয়ে নিশ্চিত (BOS)। শেষ higher low-র নিচে প্রথম close-ই CHoCH।"),
             T("BOS continues the trend; CHoCH is the first sign the sequence of higher lows has broken. It is a warning, not a reversal guarantee.",
               "BOS trend চালু রাখে; CHoCH হলো higher low-র ধারা ভাঙার প্রথম সংকেত। এটি সতর্কতা, reversal-এর নিশ্চয়তা নয়।"),
             [mk(h2, "HH", below=False), mk(hl2, "HL"), mk(bos2, "BOS", below=False),
              hline(hl3_low, "Last HL", GREY), mk(lh, "LH", below=False), mk(choch, "CHoCH", below=False)],
             T("Close beyond the swing = structure break", "Swing-এর বাইরে close = structure break"), ["01-market-structure"], tf="H1")
    m["pane"] = None
    m.pop("pane")
    save(m, b)

    b, v, rng = new(172, 2300)
    _, e = leg(b, v, rng, 8, 2330); h1 = hi_idx(b, 0, e); lvl = b.candles[h1]["h"]
    leg(b, v, rng, 5, 2318)
    leg(b, v, rng, 6, 2326)
    o = b.last
    wick = b.add(o=o, h=lvl + 4, l=o - 1, c=lvl - 2)
    leg(b, v, rng, 7, 2310)
    assert b.candles[wick]["h"] > lvl and b.candles[wick]["c"] < lvl
    m = meta("smc-ms-02", T("A wick above the high is not a BOS", "High-এর ওপরে শুধু wick মানে BOS নয়"),
             "neutral", None, ["XAUUSD", "smc", "bos", "failure"],
             T("XAUUSD H1 (synthetic): one bar's wick pokes above the previous high but closes below it. No BOS; price falls back.",
               "XAUUSD H1 (কাল্পনিক): একটি bar-এর wick আগের high ছাড়ায় কিন্তু নিচে close হয়। BOS নয়; দাম নেমে যায়।"),
             T("Rule used in this series: a break of structure needs a candle body close beyond the swing. A wick alone is a sweep candidate.",
               "এই series-এর নিয়ম: structure break-এ swing-এর বাইরে candle body close লাগে। শুধু wick হলো sweep-এর প্রার্থী।"),
             [hline(lvl, "Previous high", GREY), mk(wick, "Wick only", below=False)],
             T("Wick = not enough; wait for the close", "Wick যথেষ্ট নয়; close-এর অপেক্ষা"), ["01-market-structure"], tf="H1")
    save(m, b)


# ───────────────────────── 02 liquidity ─────────────────────────
def equal_highs(seed, start=2300):
    b, v, rng = new(seed, start)
    _, e = leg(b, v, rng, 6, 2320); t1 = hi_idx(b, 0, e)
    leg(b, v, rng, 4, 2312)
    s, e = leg(b, v, rng, 5, 2320); t2 = hi_idx(b, s, e)
    leg(b, v, rng, 4, 2313)
    s, e = leg(b, v, rng, 5, 2320); t3 = hi_idx(b, s, e)
    leg(b, v, rng, 3, 2315)
    level = max(b.candles[i]["h"] for i in (t1, t2, t3))
    assert level - min(b.candles[i]["h"] for i in (t1, t2, t3)) <= 2.5, "highs roughly equal"
    o = b.last
    sweep = b.add(o=o, h=level + 6, l=o - 1, c=level - 2)
    return b, v, rng, level, (t1, t2, t3), sweep


def liq_charts():
    b, v, rng, level, ts, sweep = equal_highs(181)
    leg(b, v, rng, 8, 2296)
    m = meta("smc-liq-01", T("Equal highs swept, then price falls", "Equal high sweep, তারপর দাম নামে"),
             "bearish", None, ["XAUUSD", "smc", "liquidity", "sweep"],
             T("XAUUSD H1 (synthetic): three touches of the same high, buy stops rest above. One bar runs above them and closes back below (sweep), then price falls.",
               "XAUUSD H1 (কাল্পনিক): একই high তিনবার ছোঁয়া, ওপরে buy stop জমে। একটি bar সেগুলো ছাড়িয়ে আবার নিচে close হয় (sweep), তারপর দাম নামে।"),
             T("Equal highs are visible, so stops gather just above them. A sweep takes those orders; what happens next decides whether it was a sweep or a real breakout.",
               "Equal high চোখে পড়ে, তাই stop ঠিক ওপরে জমে। Sweep সেই order নেয়; পরে কী হয় তাই ঠিক করে এটা sweep ছিল না আসল breakout।"),
             [hline(level, "BSL: equal highs", GREY), mk(ts[0], "1", below=False), mk(ts[1], "2", below=False),
              mk(ts[2], "3", below=False), mk(sweep, "Sweep", below=False)],
             T("Liquidity is a level, the sweep is the event", "Liquidity একটি level, sweep একটি ঘটনা"), ["02-liquidity-sweeps"], tf="H1")
    save(m, b)

    b, v, rng, level, ts, sweep = equal_highs(182)
    sb = b.candles[sweep]
    entry = round(sb["c"] - 2.0, 2)
    stop = round(sb["h"] + 3, 2)
    target = round(entry - 2 * (stop - entry), 2)
    o = b.last
    trig = b.add(o=o, h=o + 0.8, l=entry - 0.7, c=entry - 0.5)
    leg(b, v, rng, 6, stop + 14)
    m = meta("smc-liq-02", T("The 'sweep' that was a real breakout", "যে 'sweep' আসলে ছিল সত্যিকারের breakout"),
             "bearish", "loss", ["XAUUSD", "smc", "liquidity", "sweep", "failure"],
             T(f"XAUUSD H1 (synthetic): same picture as the previous chart, but the sell at {entry} fails. Buyers keep control, price closes above the high, stop {stop} is hit.",
               f"XAUUSD H1 (কাল্পনিক): আগের chart-এর মতোই ছবি, কিন্তু {entry}-এ sell ব্যর্থ। Buyer নিয়ন্ত্রণ ছাড়েনি, দাম high-এর ওপরে close হয়, stop {stop} লাগে।"),
             T("A sweep alone is not a signal. Without a following structure break (CHoCH) the same candle can be the start of a breakout.",
               "শুধু sweep কোনো সংকেত নয়। পরে structure break (CHoCH) না এলে একই candle breakout-এর শুরুও হতে পারে।"),
             [hline(level, "BSL", GREY), mk(sweep, "Looks like a sweep", below=False), mk(trig, "Sell", below=False),
              hline(stop, f"Stop {stop}", RED)],
             T("Wait for CHoCH after the sweep", "Sweep-এর পর CHoCH-এর অপেক্ষা"), ["02-liquidity-sweeps"], ctype="trade-setup", tf="H1")
    save(m, b, trade=dict(entry=entry, stop=stop, target=target, side="short", trigger_index=trig, expect="loss"))


# ───────────────────────── 03 order block + FVG ─────────────────────────
def ob_chart():
    b, v, rng = new(191, 2310)
    _, e = leg(b, v, rng, 6, 2312); sh = hi_idx(b, 0, e); sh_lvl = b.candles[sh]["h"]
    leg(b, v, rng, 6, 2299)
    o = b.last
    ob = b.add(o=o, h=o + 0.5, l=o - 3.5, c=o - 3)
    obc = b.candles[ob]
    k1 = b.add(o=obc["c"], h=obc["c"] + 16, l=obc["c"] - 0.3, c=obc["c"] + 15.5)
    o = b.last
    k2 = b.add(o=o, h=o + 6, l=obc["h"] + 7.5, c=o + 4)
    assert b.candles[k2]["l"] > obc["h"], "FVG between OB high and k2 low"
    bos = first_close(b, ob, above=sh_lvl)
    fvg_lo, fvg_hi = obc["h"], b.candles[k2]["l"]
    leg(b, v, rng, 5, 2332)
    leg(b, v, rng, 6, fvg_hi - 3)
    entry = round(b.last - 1.5, 2)
    assert fvg_lo < entry < fvg_hi, (fvg_lo, entry, fvg_hi)
    stop = round(obc["l"] - 1, 2)
    target = round(entry + 2 * (entry - stop), 2)
    o = b.last
    trig = b.add(o=o, h=o + 0.6, l=entry - 0.6, c=entry + 0.3)
    leg(b, v, rng, 8, target + 6)
    print("ob-01", dict(ob=ob, bos=bos, fvg=(fvg_lo, fvg_hi), entry=entry, stop=stop, target=target))
    m = meta("smc-ob-01", T("Order block and FVG: impulse, return, reaction", "Order block ও FVG: impulse, ফেরা, reaction"),
             "bullish", "win", ["XAUUSD", "smc", "order-block", "fvg"],
             T(f"XAUUSD H1 (synthetic): the last down candle before a strong impulse (OB) and the gap the impulse leaves (FVG). The impulse closes above the previous high (BOS). Price returns to the FVG; buy at {entry}, stop below the OB low.",
               f"XAUUSD H1 (কাল্পনিক): শক্তিশালী impulse-এর আগের শেষ down candle (OB) আর impulse-এর রেখে যাওয়া gap (FVG)। Impulse আগের high-এর ওপরে close করে (BOS)। দাম FVG-তে ফেরে; {entry}-এ buy, stop OB low-র নিচে।"),
             T("OB and FVG are zones where the impulse started and where it moved too fast. The BOS is what makes them relevant; without it they are just a candle and a gap.",
               "OB আর FVG হলো সেই zone যেখান থেকে impulse শুরু ও যেখানে দাম খুব দ্রুত গেছে। BOS-ই এদের প্রাসঙ্গিক করে; তা ছাড়া এগুলো শুধু একটি candle আর একটি gap।"),
             [zone(ob, obc["h"], ob + 3, obc["l"], "OB", GREEN), zone(ob, fvg_hi, ob + 8, fvg_lo, "FVG", BLUE),
              mk(bos, "BOS", below=False), mk(trig, "Buy"), hline(stop, f"Stop {stop}", RED)],
             T("Impulse + BOS first, zone second", "আগে impulse + BOS, তারপর zone"), ["03-order-block-fvg"], ctype="trade-setup", tf="H1")
    save(m, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=trig, expect="win"))


# ───────────────────────── 04 premium / discount ─────────────────────────
def pd_chart():
    b, v, rng = new(201, 2300)
    s, e = leg(b, v, rng, 14, 2360)
    sh = hi_idx(b, 0, e); sl = lo_idx(b, 0, e)
    hi, lo = b.candles[sh]["h"], b.candles[sl]["l"]
    eq = round((hi + lo) / 2, 2)
    ote_hi = round(hi - 0.62 * (hi - lo), 2)
    ote_lo = round(hi - 0.79 * (hi - lo), 2)
    leg(b, v, rng, 8, ote_hi - 3)
    entry = round(b.last - 1.5, 2)
    assert ote_lo < entry < ote_hi, (ote_lo, entry, ote_hi)
    stop = round(lo + 3, 2)
    target = round(hi - 4, 2)
    o = b.last
    trig = b.add(o=o, h=o + 0.6, l=entry - 0.6, c=entry + 0.3)
    leg(b, v, rng, 8, hi + 6)
    print("pd-01", dict(hi=hi, lo=lo, eq=eq, ote=(ote_lo, ote_hi), entry=entry, stop=stop, target=target))
    m = meta("smc-pd-01", T("Dealing range: premium, discount and the OTE zone", "Dealing range: premium, discount ও OTE zone"),
             "bullish", "win", ["XAUUSD", "smc", "premium-discount", "ote"],
             T(f"XAUUSD H1 (synthetic): range {lo}–{hi}, equilibrium {eq}. Price retraces into the discount half, inside the 0.62–0.79 zone ({ote_lo}–{ote_hi}). Buy at {entry}, stop {stop} below the range low, target near the high.",
               f"XAUUSD H1 (কাল্পনিক): range {lo}–{hi}, equilibrium {eq}। দাম discount অংশে, 0.62–0.79 zone-এর ({ote_lo}–{ote_hi}) ভেতরে ফেরে। {entry}-এ buy, stop range low-র নিচে {stop}, target high-এর কাছে।"),
             T("Buying in discount and selling in premium gives a better entry price and a closer stop. Direction still comes from structure, not from the zone.",
               "Discount-এ buy আর premium-এ sell ভালো entry দাম ও কাছের stop দেয়। দিক তবু structure থেকে আসে, zone থেকে নয়।"),
             [hline(hi, "Range high", GREY), hline(eq, f"EQ {eq}", GOLD, "solid"), hline(lo, "Range low", GREY),
              zone(trig - 2, ote_hi, trig + 6, ote_lo, "OTE", GOLD), mk(trig, "Buy"), hline(stop, f"Stop {stop}", RED)],
             T("Direction from structure, price from the zone", "দিক structure থেকে, দাম zone থেকে"), ["04-premium-discount"], ctype="trade-setup", tf="H1")
    save(m, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=trig, expect="win"))


def pd_fail_chart():
    b, v, rng = new(202, 2300)
    s, e = leg(b, v, rng, 14, 2360)
    sh = hi_idx(b, 0, e); sl = lo_idx(b, 0, e)
    hi, lo = b.candles[sh]["h"], b.candles[sl]["l"]
    ote_hi = round(hi - 0.62 * (hi - lo), 2)
    ote_lo = round(hi - 0.79 * (hi - lo), 2)
    leg(b, v, rng, 8, ote_hi - 3)
    entry = round(b.last - 1.5, 2)
    assert ote_lo < entry < ote_hi
    stop = round(lo - 3, 2)
    target = round(entry + 2 * (entry - stop), 2)
    o = b.last
    trig = b.add(o=o, h=o + 0.6, l=entry - 0.6, c=entry + 0.3)
    leg(b, v, rng, 6, entry + 3)
    leg(b, v, rng, 10, stop - 12)
    m = meta("smc-pd-02", T("Discount is not a reason: the range itself breaks", "Discount নিজে কারণ নয়: range-ই ভেঙে যায়"),
             "bullish", "loss", ["XAUUSD", "smc", "premium-discount", "failure"],
             T(f"XAUUSD H1 (synthetic): buy in the OTE zone at {entry}, but the retracement never ends. Price closes below the range low and the stop at {stop} is hit.",
               f"XAUUSD H1 (কাল্পনিক): OTE zone-এ {entry}-এ buy, কিন্তু retracement থামে না। দাম range low-র নিচে close হয়, stop {stop} লাগে।"),
             T("Discount only says the price is cheaper inside the range. If the range low breaks, the range is gone and the zone means nothing.",
               "Discount শুধু বলে range-এর ভেতরে দাম সস্তা। Range low ভাঙলে range-ই নেই, আর zone-এর কোনো অর্থ থাকে না।"),
             [hline(hi, "Range high", GREY), hline(lo, "Range low", GREY),
              zone(trig - 2, ote_hi, trig + 6, ote_lo, "OTE", GOLD), mk(trig, "Buy"), hline(stop, f"Stop {stop}", RED)],
             T("Stop beyond the range low: that is where the idea ends", "Stop range low-র বাইরে: সেখানেই idea শেষ"), ["04-premium-discount"], ctype="trade-setup", tf="H1")
    save(m, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=trig, expect="loss"))


# ───────────────────────── 05/06 sessions + Power of 3 ─────────────────────────
DAY = [  # (close, upper_wick, lower_wick); open = previous close. 24 H1 bars
    (2338.5, 1, 1), (2337, 1, 1), (2339, 1, 1), (2337.5, 1, 1), (2338.8, 1, 1), (2337.2, 1, 1), (2338.4, 1, 1), (2338, 1, 1),
    (2341.5, 1.5, 0.5), (2344, 1, 0.5), (2339.5, 0.5, 1), (2334.5, 0.5, 1), (2331, 0.5, 1), (2333, 1, 0.5), (2328, 0.5, 1),
    (2330, 1, 0.5), (2324, 0.5, 1), (2319, 0.5, 1), (2321, 1, 0.5), (2314, 0.5, 1), (2316, 1, 0.5), (2310, 0.5, 1),
    (2312, 1, 0.5), (2308, 0.5, 1),
]


def day_builder():
    b = Builder(start=2338, pip=1.0, seed=211, decimals=2)
    for c, uw, lw in DAY:
        o = b.last
        b.add(o=o, h=max(o, c) + uw, l=min(o, c) - lw, c=c)
    asia_hi = max(b.candles[i]["h"] for i in range(8))
    asia_lo = min(b.candles[i]["l"] for i in range(8))
    assert b.candles[9]["h"] > asia_hi and b.candles[9]["c"] > asia_hi, "manipulation above Asia high"
    assert b.candles[11]["c"] < asia_lo, "true move closes below Asia low"
    return b, asia_hi, asia_lo


def day_charts():
    b, ah, al = day_builder()
    top, bot = max(k["h"] for k in b.candles), min(k["l"] for k in b.candles)
    m = meta("smc-sess-01", T("One day by session: Asia range, London move, New York continuation", "দিনের session ধরে: Asia range, London move, New York ধারা"),
             "bearish", None, ["XAUUSD", "smc", "sessions", "kill-zone"],
             T("XAUUSD H1 (synthetic): a narrow Asia range, a London push above its high that reverses and breaks the low, then a New York continuation. Bar 0 is the start of the Asia session; the bands are illustrative.",
               "XAUUSD H1 (কাল্পনিক): সংকীর্ণ Asia range, London-এ high-এর ওপরে push, উল্টে low ভাঙা, তারপর New York-এ ধারা চলে। Bar 0 = Asia session-এর শুরু; band গুলো উদাহরণমাত্র।"),
             T("Sessions differ in liquidity: Asia often builds the range, London and New York take its highs and lows. Kill zones are the windows where this is most often looked for.",
               "Session-ভেদে liquidity আলাদা: Asia প্রায়ই range বানায়, London ও New York তার high-low নেয়। Kill zone হলো সেই সময়-জানালা যেখানে এটা সবচেয়ে বেশি খোঁজা হয়।"),
             [zone(0, ah, 7, al, "Asia range", GREY), zone(8, top, 14, bot, "London KZ", GOLD),
              zone(15, top, 20, bot, "NY KZ", BLUE), mk(9, "Asia high swept", below=False), mk(11, "Asia low broken", below=False)],
             T("Mark the Asia range first, then watch who takes which side", "আগে Asia range আঁকুন, তারপর দেখুন কে কোন দিক নেয়"), ["05-sessions-kill-zones"], tf="H1")
    save(m, b)

    b, ah, al = day_builder()
    m = meta("smc-po3-01", T("Power of 3: accumulation, manipulation, distribution", "Power of 3: accumulation, manipulation, distribution"),
             "bearish", None, ["XAUUSD", "smc", "power-of-3", "amd"],
             T("XAUUSD H1 (synthetic): the same day read as AMD. The Asia range is accumulation, the push above it is manipulation (Judas swing), the move below the range is distribution.",
               "XAUUSD H1 (কাল্পনিক): একই দিন AMD হিসেবে পড়া। Asia range হলো accumulation, তার ওপরে push হলো manipulation (Judas swing), range-এর নিচে যাওয়া হলো distribution।"),
             T("AMD is a model, not a law. Many days do not follow it, and the manipulation can also be down first on a bullish day.",
               "AMD একটি model, নিয়ম নয়। অনেক দিন এটি মানে না, আর bullish দিনে manipulation আগে নিচেও হতে পারে।"),
             [zone(0, ah, 7, al, "A: Accumulation", GREY), zone(8, 2345.5, 10, 2333, "M: Manipulation", RED),
              zone(11, 2332, 23, 2306, "D: Distribution", GREEN), mk(9, "Judas swing", below=False)],
             T("Judge the model only after the day ends", "Model যাচাই হয় দিন শেষে, আগে নয়"), ["06-power-of-3"], tf="H1")
    save(m, b)


UP_DAY = [  # same Asia range, then London keeps going up: the "sweep" never reverses
    (2338.5, 1, 1), (2337, 1, 1), (2339, 1, 1), (2337.5, 1, 1), (2338.8, 1, 1), (2337.2, 1, 1), (2338.4, 1, 1), (2338, 1, 1),
    (2341.5, 1.5, 0.5), (2344, 1, 0.5), (2342.5, 1, 1), (2346, 1, 0.5), (2349, 1, 0.5), (2347, 1, 1), (2351, 1, 0.5),
    (2354, 1, 0.5), (2352, 1, 1), (2356, 1, 0.5), (2359, 1, 0.5), (2357, 1, 1), (2361, 1, 0.5), (2363, 1, 0.5),
    (2360, 1, 1), (2364, 1, 0.5),
]


def day_fail_chart():
    b = Builder(start=2338, pip=1.0, seed=212, decimals=2)
    for c, uw, lw in UP_DAY:
        o = b.last
        b.add(o=o, h=max(o, c) + uw, l=min(o, c) - lw, c=c)
    ah = max(b.candles[i]["h"] for i in range(8))
    al = min(b.candles[i]["l"] for i in range(8))
    assert min(b.candles[i]["l"] for i in range(8, 24)) > al, "never returns below the Asia low"
    top, bot = max(k["h"] for k in b.candles), min(k["l"] for k in b.candles)
    m = meta("smc-sess-02", T("The day that did not reverse", "যে দিনে দাম উল্টোয়নি"),
             "bullish", None, ["XAUUSD", "smc", "sessions", "failure"],
             T("XAUUSD H1 (synthetic): the same Asia range, but London breaks the high and keeps going. Selling the 'sweep' in the London kill zone would fail all day.",
               "XAUUSD H1 (কাল্পনিক): একই Asia range, কিন্তু London high ভেঙে চলতেই থাকে। London kill zone-এ 'sweep' ভেবে sell করলে সারাদিন ব্যর্থ হত।"),
             T("A kill zone says when to look, not which way to trade. Without a return inside the Asia range and a structure break, there is no sweep.",
               "Kill zone বলে কখন দেখবেন, কোন দিকে trade করবেন তা নয়। Asia range-এর ভেতরে ফেরা ও structure ভাঙা না হলে sweep নেই।"),
             [zone(0, ah, 7, al, "Asia range", GREY), zone(8, top, 14, bot, "London KZ", GOLD),
              mk(9, "Closes above: no sweep", below=False)],
             T("Time of day is a filter, not a signal", "দিনের সময় একটি filter, সংকেত নয়"), ["05-sessions-kill-zones"], tf="H1")
    save(m, b)


# ───────────────────────── 07 entry model fail ─────────────────────────
def entry_fail_chart():
    b, v, rng = new(231, 2400)
    leg(b, v, rng, 10, 2368)
    s, e = leg(b, v, rng, 3, 2376); lh = hi_idx(b, s, e); lh_lvl = b.candles[lh]["h"]
    s, e = leg(b, v, rng, 7, 2352); low_i = lo_idx(b, s, e); low_lvl = b.candles[low_i]["l"]
    o = b.last
    sweep = b.add(o=o, h=o + 1, l=low_lvl - 5, c=low_lvl + 2)
    m0 = b.add(o=b.last, h=b.last + 4, l=b.last - 0.5, c=b.last + 3.5)
    m1 = b.add(o=b.last, h=b.last + 24, l=b.last - 0.5, c=b.last + 22)
    o = b.last
    m2 = b.add(o=o, h=o + 6, l=b.candles[m0]["h"] + 8, c=o + 4)
    choch = first_close(b, sweep, above=lh_lvl)
    fvg_lo, fvg_hi = b.candles[m0]["h"], b.candles[m2]["l"]
    assert fvg_lo < fvg_hi
    leg(b, v, rng, 4, fvg_hi - 3)
    entry = round(b.last - 1.5, 2)
    assert fvg_lo < entry < fvg_hi, (fvg_lo, entry, fvg_hi)
    stop = round(b.candles[sweep]["l"] - 1, 2)
    target = round(entry + 2 * (entry - stop), 2)
    o = b.last
    trig = b.add(o=o, h=o + 0.6, l=entry - 0.6, c=entry + 0.3)
    leg(b, v, rng, 10, stop - 14)
    print("entry-fail", dict(sweep=sweep, choch=choch, fvg=(fvg_lo, fvg_hi), entry=entry, stop=stop, target=target))
    m = meta("smc-entry-fail-01", T("The full model, taken against the bigger trend", "পুরো model, বড় trend-এর বিপরীতে নেওয়া"),
             "bullish", "loss", ["XAUUSD", "smc", "entry-model", "failure"],
             T(f"XAUUSD H1 (synthetic): low swept, CHoCH up, buy in the FVG at {entry}. Every step is textbook, but the higher-timeframe trend is down: the bounce ends and stop {stop} is hit.",
               f"XAUUSD H1 (কাল্পনিক): low sweep, ওপরে CHoCH, {entry}-এ FVG-তে buy। প্রতিটি ধাপ বইয়ের মতো, কিন্তু higher-timeframe trend নিচে: bounce শেষ হয়, stop {stop} লাগে।"),
             T("A perfect sequence on a lower timeframe can be just a pullback inside a larger move. The bias must come first; the model only times the entry.",
               "ছোট timeframe-এ নিখুঁত ক্রম বড় move-এর ভেতরের pullback-ও হতে পারে। আগে bias, model শুধু entry-র সময় ঠিক করে।"),
             [mk(sweep, "Sweep"), mk(choch, "CHoCH", below=False), zone(m0, fvg_hi, m0 + 8, fvg_lo, "FVG", BLUE),
              mk(trig, "Buy"), hline(stop, f"Stop {stop}", RED)],
             T("HTF bias first; the model is only timing", "আগে HTF bias; model শুধু timing"), ["07-entry-models"], ctype="trade-setup", tf="H1")
    save(m, b, trade=dict(entry=entry, stop=stop, target=target, side="long", trigger_index=trig, expect="loss"))


if __name__ == "__main__":
    ms_charts()
    liq_charts()
    ob_chart()
    pd_chart()
    pd_fail_chart()
    day_charts()
    day_fail_chart()
    entry_fail_chart()
