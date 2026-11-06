"""Synthetic chart generator for pattern articles.

Usage in a spec file:
    from patgen import Builder, save
    b = Builder(start=1.2800, pip=0.0001, seed=7)
    b.walk([-20, -15, 10, ...])            # close-to-close moves in pips (wicks auto)
    b.add(o=..., h=..., l=..., c=...)      # explicit candle (absolute prices)
    save(chart_dict_without_candles, b, trade=dict(entry=..., stop=..., target=..., side='long',
         trigger_index=20, expect='win'))
"""
import json
import os
import random

REPO = r"D:\trading-knowledge\content\charts"

BLUE = "#3b82f6"
GOLD = "#f5b301"
RED = "#ef4444"
GREEN = "#22c55e"


class Builder:
    def __init__(self, start, pip, seed=1, decimals=None):
        self.pip = pip
        self.rng = random.Random(seed)
        self.candles = []
        self.last = start
        self.decimals = decimals if decimals is not None else (5 if pip < 0.001 else 2)

    def _r(self, x):
        return round(x, self.decimals)

    def walk(self, moves, wick=(0.2, 0.6), min_wick=2):
        """moves: close-to-close change in pips for each new candle."""
        for m in moves:
            o = self.last
            c = o + m * self.pip
            body = abs(m)
            up = (min_wick + body * self.rng.uniform(*wick)) * self.pip
            dn = (min_wick + body * self.rng.uniform(*wick)) * self.pip
            self.add(o=o, h=max(o, c) + up, l=min(o, c) - dn, c=c)
        return self

    def add(self, o, h, l, c):
        k = {"o": self._r(o), "h": self._r(h), "l": self._r(l), "c": self._r(c)}
        k["h"] = max(k["h"], k["o"], k["c"])
        k["l"] = min(k["l"], k["o"], k["c"])
        k["i"] = len(self.candles)
        self.candles.append({"i": k["i"], "o": k["o"], "h": k["h"], "l": k["l"], "c": k["c"]})
        self.last = k["c"]
        return k["i"]

    def at(self, price_pips_from_last):
        return self.last + price_pips_from_last * self.pip

    @property
    def n(self):
        return len(self.candles)


def check_trade(candles, entry, stop, target, side, trigger_index, expect):
    """Entry must fill on trigger candle; then outcome decided by first touch of stop/target."""
    k = candles[trigger_index]
    assert k["l"] <= entry <= k["h"], f"entry {entry} not inside trigger candle {k}"
    long = side == "long"
    # trigger candle itself must not touch stop (keeps the story clean)
    if long:
        assert k["l"] > stop, f"trigger candle touches stop {k}"
    else:
        assert k["h"] < stop, f"trigger candle touches stop {k}"
    for c in candles[trigger_index + 1:]:
        hit_stop = c["l"] <= stop if long else c["h"] >= stop
        hit_tgt = c["h"] >= target if long else c["l"] <= target
        assert not (hit_stop and hit_tgt), f"ambiguous candle {c}"
        if hit_tgt:
            assert expect == "win", f"expected {expect} but target hit at {c['i']}"
            return c["i"]
        if hit_stop:
            assert expect == "loss", f"expected {expect} but stop hit at {c['i']}"
            return c["i"]
    raise AssertionError("neither stop nor target hit")


def save(meta, b, trade=None):
    assert meta["mode"] == "synthetic"
    path = os.path.join(REPO, meta["id"] + ".json")
    assert not os.path.exists(path) or meta.get("overwrite"), f"exists: {path}"
    meta.pop("overwrite", None)
    for k in b.candles:
        assert k["h"] >= max(k["o"], k["c"]) and k["l"] <= min(k["o"], k["c"]), k
    for a in meta.get("annotations", []):
        if "i" in a:
            assert 0 <= a["i"] < b.n, a
    out = dict(meta)
    if trade:
        hit = check_trade(b.candles, **trade)
        out["entry"] = trade["entry"]
        out["stopLoss"] = trade["stop"]
        out["takeProfit"] = trade["target"]
        risk = abs(trade["entry"] - trade["stop"])
        reward = abs(trade["target"] - trade["entry"])
        out["rr"] = f"1:{reward / risk:.1f}"
        print(meta["id"], "outcome at candle", hit, "rr", out["rr"])
    out["candles"] = b.candles
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print("wrote", path, b.n, "candles")


def base_meta(cid, title, symbol, tf, bias, outcome, tags, caption, explanation, annotations, takeaway):
    return {
        "id": cid,
        "title": title,
        "symbol": symbol,
        "timeframe": tf,
        "mode": "synthetic",
        "type": "pattern",
        "bias": bias,
        "outcome": outcome,
        "tags": tags,
        "module": "patterns",
        "lessonSlugs": [],
        "caption": caption,
        "notes": {"en": "Illustrative synthetic data, not a real market record.",
                  "bn": "শিক্ষামূলক কাল্পনিক ডেটা, বাস্তব মার্কেটের রেকর্ড নয়।"},
        "updatedAt": "2026-11-06T12:00:00Z",
        "annotations": annotations,
        "explanation": explanation,
        "keyTakeaways": [takeaway],
    }


def hline(price, label, color, style="dashed"):
    return {"type": "hline", "price": price, "label": label, "color": color, "style": style}


def marker(i, text, below=True, shape=None):
    return {"type": "marker", "i": i, "position": "belowBar" if below else "aboveBar",
            "shape": shape or ("arrowUp" if below else "arrowDown"), "text": text}
