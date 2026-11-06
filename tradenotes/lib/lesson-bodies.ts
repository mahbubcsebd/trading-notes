import type { LessonBody, QuizItem } from "./types";

/*
 * Full lesson text, keyed by "<chapter number, two digits>-<lesson slug>".
 * Chapter 1 is written in full. Lessons without an entry show their summary and key takeaways,
 * plus a note that the full text is on its way. Add an entry here to publish a lesson.
 *
 * Block types: p, def, note, ul, ol, table, fig. Use **double asterisks** for bold.
 */
const q = (question: string, options: string[], answer: number, why: string): QuizItem => ({
  q: question,
  options,
  answer,
  why,
});

export const lessonBodies: Record<string, LessonBody> = {
  "01-what-is-forex": {
    sections: [
      {
        id: "exchanged",
        title: "What is being exchanged",
        blocks: [
          { t: "p", text: "Every forex trade is an exchange of one currency for another. Because one side is always being bought and the other sold, prices are quoted for a **pair**, such as EURUSD." },
          { t: "def", text: "In a pair, the first currency is the **base** and the second is the **quote**. A price of 1.0850 on EURUSD means 1 euro costs 1.0850 US dollars. Buying the pair means buying euros and selling dollars." },
          { t: "p", text: "Price changes are counted in pips. For most pairs a pip is 0.0001, so a move from 1.0850 to 1.0900 is 50 pips." },
          { t: "fig", id: "pips", caption: "Illustrative example, not a trade idea." },
        ],
      },
      {
        id: "market",
        title: "How the market is organised",
        blocks: [
          { t: "p", text: "There is no single exchange. Banks, brokers and institutions trade with each other over electronic networks, which is why it is called a decentralised market. It stays open from the Sydney open on Sunday evening until the New York close on Friday." },
          { t: "p", text: "One practical result is that the price you see can differ slightly between brokers. Lesson 4 explains how that difference turns into a trading cost." },
        ],
      },
      {
        id: "risk",
        title: "Where the risk comes from",
        blocks: [
          { t: "p", text: "Brokers let you control a position larger than your deposit. This is leverage. With 1:100 leverage, a $1,000 account can open a position worth $100,000." },
          { t: "p", text: "The profit or loss is counted on the full position. A 1% move against a $100,000 position is a $1,000 loss, which is the whole account. **Leverage does not change the odds. It changes how much each move is worth.**" },
        ],
      },
    ],
    quiz: [
      q("EURUSD is quoted at 1.0850. What does that price mean?", ["1 euro costs 1.0850 US dollars", "1 US dollar costs 1.0850 euros", "The spread is 1.0850 pips"], 0, "The first currency is the base, and the price states how much of the quote currency one unit of the base costs."),
      q("How is the forex market organised?", ["Through one central exchange", "Through a network of banks, brokers and institutions", "Through a single government office"], 1, "It is decentralised, so there is no one venue and no single official price."),
      q("What does leverage do to your losses?", ["Reduces them", "Multiplies them, just as it multiplies gains", "Has no effect on them"], 1, "Profit and loss are counted on the full position size, not on your deposit."),
    ],
  },

  "01-market-participants": {
    sections: [
      {
        id: "who",
        title: "Who trades",
        blocks: [
          { t: "p", text: "The forex market is a network of very different participants. Each trades for a different reason, which is why price sometimes moves for reasons that do not show up as a chart pattern." },
          { t: "ul", items: [
            "**Central banks** set interest rates and sometimes step in to influence their currency.",
            "**Commercial and investment banks** quote prices to clients and trade with each other in the interbank market.",
            "**Hedge funds and asset managers** take positions on rates, growth and risk appetite, often in large size.",
            "**Corporations** exchange currency to pay suppliers and receive revenue from abroad, or to hedge that exposure.",
            "**Retail traders** trade through brokers in much smaller size.",
          ] },
        ],
      },
      {
        id: "liquidity",
        title: "Where liquidity comes from",
        blocks: [
          { t: "def", text: "**Liquidity** is how easily you can buy or sell without moving the price." },
          { t: "p", text: "Banks and other liquidity providers post prices to buy and sell. When many of them are active, spreads are tight and large orders fill with little price impact. When few are active, such as late on a Friday or after a surprise headline, spreads widen and price can jump." },
          { t: "p", text: "Retail traders make up only a small share of total volume." },
        ],
      },
      {
        id: "why",
        title: "Why this matters to you",
        blocks: [
          { t: "ul", items: [
            "Large orders can push price through a level quickly, which is why stops just beyond obvious levels are often hit.",
            "Price often reacts at data releases and session opens, when large orders arrive.",
            "You trade alongside participants with different goals and far more capital, so manage your own risk first.",
          ] },
        ],
      },
    ],
    quiz: [
      q("Which participant most often trades to hedge business exposure rather than to profit from price moves?", ["Hedge funds", "Corporations", "Retail traders"], 1, "Corporations exchange currency to pay or receive money abroad and to protect against exchange rate changes."),
      q("What does high liquidity usually mean for a trader?", ["Wider spreads and bigger price gaps", "Tighter spreads and easier fills", "No risk of slippage"], 1, "When many participants are quoting prices, spreads narrow and orders fill closer to the price you expect."),
      q("Who supplies most of the volume in the forex market?", ["Retail traders", "Banks and large institutions", "Only central banks"], 1, "Retail trading is a small share of total volume."),
    ],
  },

  "01-pips-lots-leverage-margin": {
    sections: [
      {
        id: "pips",
        title: "Pips",
        blocks: [
          { t: "p", text: "A pip is the standard unit used to measure price change. On most pairs it is the fourth decimal place, 0.0001. On pairs quoted in Japanese yen it is the second decimal place, 0.01. Many brokers also show a tenth of a pip, called a pipette." },
          { t: "p", text: "If EURUSD moves from 1.0850 to 1.0870, it has moved 20 pips." },
        ],
      },
      {
        id: "lots",
        title: "Lots",
        blocks: [
          { t: "table", head: ["Lot", "Units of base currency", "Value per pip on EURUSD"], rows: [["Standard", "100,000", "$10"], ["Mini", "10,000", "$1"], ["Micro", "1,000", "$0.10"]] },
          { t: "p", text: "Pip value comes from pip size times units. For EURUSD, 0.0001 × 100,000 = $10 per pip on a standard lot." },
        ],
      },
      {
        id: "margin",
        title: "Leverage and margin",
        blocks: [
          { t: "def", text: "**Margin** is the deposit your broker holds while a position is open. **Leverage** is the ratio between the position size and that deposit." },
          { t: "p", text: "Margin required = position value ÷ leverage. One standard lot of EURUSD at 1.0850 is worth 100,000 × 1.0850 = $108,500. At 1:100 leverage the margin is $1,085." },
          { t: "p", text: "If losses reduce your equity until it no longer covers the margin, the broker may close positions. This is called a margin call or stop out, and brokers set their own levels." },
          { t: "note", text: "Margin is not the risk. The risk is the distance to your stop multiplied by position size. The Risk Management chapter shows how to size a trade from risk." },
        ],
      },
    ],
    quiz: [
      q("EURUSD moves from 1.0850 to 1.0900. How many pips is that?", ["5", "50", "500"], 1, "1.0900 − 1.0850 = 0.0050, and one pip is 0.0001, so the move is 50 pips."),
      q("What is the value of one pip on a standard lot of EURUSD?", ["$0.10", "$1", "$10"], 2, "0.0001 × 100,000 units = $10."),
      q("A position is worth $108,500 and leverage is 1:100. What margin is required?", ["$108.50", "$1,085", "$10,850"], 1, "Margin = position value ÷ leverage = 108,500 ÷ 100 = $1,085."),
    ],
  },

  "01-spread-commission-swap": {
    sections: [
      {
        id: "spread",
        title: "Spread",
        blocks: [
          { t: "def", text: "The **bid** is the price you can sell at. The **ask** is the price you can buy at. The **spread** is the ask minus the bid." },
          { t: "p", text: "If EURUSD shows a bid of 1.0848 and an ask of 1.0850, the spread is 0.0002, or 2 pips. You pay it as soon as you open a trade, so a new position starts slightly negative. On a standard lot, 2 pips costs 2 × $10 = $20." },
        ],
      },
      {
        id: "commission",
        title: "Commission",
        blocks: [
          { t: "p", text: "Some accounts offer a very tight spread and charge a fixed commission per lot instead. Compare the total of spread plus commission, because a low spread on its own does not mean a low cost." },
        ],
      },
      {
        id: "swap",
        title: "Swap",
        blocks: [
          { t: "p", text: "If you hold a position past the daily rollover time, the broker applies a swap. It reflects the interest rate difference between the two currencies, plus the broker's charge. It can be a credit or a charge depending on the pair and your direction. Many brokers apply a triple swap on one day of the week to cover the weekend." },
          { t: "note", text: "Check your broker's swap table before holding a trade overnight, especially on gold." },
        ],
      },
      {
        id: "total",
        title: "Adding it up",
        blocks: [
          { t: "p", text: "Cost of a trade = spread cost + commission + swap. For a short-term trade, spread and commission dominate. For a trade held for weeks, swap can matter as much." },
        ],
      },
    ],
    quiz: [
      q("Bid is 1.0848 and ask is 1.0850. What is the spread?", ["0.2 pips", "2 pips", "20 pips"], 1, "1.0850 − 1.0848 = 0.0002, which is 2 pips."),
      q("Which cost applies only if you hold a position overnight?", ["Spread", "Commission", "Swap"], 2, "Swap is charged or credited at the daily rollover."),
      q("Why compare spread plus commission rather than spread alone?", ["Commission is always zero", "Some accounts trade a lower spread for a separate fee, so the total is what you pay", "Spread is only charged on losing trades"], 1, "A tight spread can be offset by a commission, so only the total shows the real cost."),
    ],
  },

  "01-trading-sessions": {
    sections: [
      {
        id: "sessions",
        title: "The four sessions",
        blocks: [
          { t: "p", text: "Forex trades around the clock from Sunday evening to Friday evening, passing between four main financial centres. The times below are approximate, in UTC, during the northern hemisphere winter." },
          { t: "fig", id: "sessions", caption: "Approximate session hours in UTC, northern winter. In summer, London and New York open an hour earlier in UTC." },
        ],
      },
      {
        id: "overlap",
        title: "The overlap",
        blocks: [
          { t: "p", text: "London and New York are open together from about 13:00 to 17:00 UTC in winter. Volume, liquidity and volatility are usually highest then, and many major US data releases land in this window." },
          { t: "note", text: "In Bangladesh time (UTC+6), the winter overlap is about 7 pm to 11 pm. In summer it is about 6 pm to 10 pm." },
        ],
      },
      {
        id: "when",
        title: "Choosing when to trade",
        blocks: [
          { t: "ul", items: [
            "The Asian session often moves in a narrower range, with exceptions around Japanese and Australian data.",
            "London often brings the first large move of the European day.",
            "Pick one or two windows you can follow fully instead of watching all day.",
          ] },
        ],
      },
    ],
    quiz: [
      q("Which two sessions overlap during the highest-volume part of the day?", ["Tokyo and Sydney", "London and New York", "Sydney and London"], 1, "The London and New York overlap usually has the most volume and volatility."),
      q("Why do session times in UTC change during the year?", ["Currencies change value", "Daylight saving in some countries", "Brokers change their hours monthly"], 1, "Some countries move their clocks, which shifts local opening times against UTC."),
      q("Which is a sensible way to use sessions?", ["Watch all four sessions every day", "Choose one or two windows you can follow closely", "Trade only when the market is quiet"], 1, "A consistent window you can attend fully works better than watching everything."),
    ],
  },

  "01-reading-a-price-chart": {
    sections: [
      {
        id: "candle",
        title: "Anatomy of a candle",
        blocks: [
          { t: "p", text: "Each candle summarises one period, such as one hour. The **body** spans the open and the close. The thin lines above and below, called **wicks** or shadows, reach the highest and lowest price of the period." },
          { t: "fig", id: "anatomy", caption: "A bullish candle closes above its open; a bearish candle closes below it." },
          { t: "p", text: "Bullish candles are usually drawn green or hollow, and bearish candles red or filled." },
        ],
      },
      {
        id: "timeframes",
        title: "Timeframes",
        blocks: [
          { t: "p", text: "A timeframe is how long each candle covers. A 1-hour chart shows one candle per hour, and a daily chart shows one per day. Lower timeframes show more detail and more noise. Higher timeframes show the larger picture and which levels matter." },
          { t: "p", text: "A common routine is to find direction on a higher timeframe, then look for entries on a lower one." },
        ],
      },
      {
        id: "trend",
        title: "Reading trend",
        blocks: [
          { t: "def", text: "An **uptrend** is a sequence of higher highs and higher lows. A **downtrend** is lower highs and lower lows. When neither is happening, the market is **ranging**." },
          { t: "p", text: "Draw the trend from swing points, the peaks and troughs you can see clearly, and ignore small wiggles. The Market Structure chapter covers this in detail." },
        ],
      },
    ],
    quiz: [
      q("What do the wicks of a candle show?", ["The average price", "The highest and lowest price of the period", "The trading volume"], 1, "Wicks reach the extremes of the period; the body shows the open and close."),
      q("Which sequence describes an uptrend?", ["Lower highs and lower lows", "Higher highs and higher lows", "Equal highs and equal lows"], 1, "An uptrend keeps making higher highs and higher lows."),
      q("A daily chart is mainly useful for...", ["Seeing the larger structure and key levels", "Timing exact entries to the minute", "Replacing risk management"], 0, "Higher timeframes show the bigger picture; lower ones are better for timing."),
    ],
  },

  "01-trading-styles-platforms-tools": {
    sections: [
      {
        id: "styles",
        title: "Four styles",
        blocks: [
          { t: "table", head: ["Style", "Typical holding time", "Screen time", "Cost sensitivity"], rows: [
            ["Scalping", "Seconds to minutes", "High", "Very high"],
            ["Day trading", "Minutes to hours, closed within the day", "High", "High"],
            ["Swing trading", "Days to weeks", "Moderate", "Moderate"],
            ["Position trading", "Weeks to months", "Low", "Low"],
          ] },
        ],
      },
      {
        id: "choose",
        title: "Choosing one",
        blocks: [
          { t: "p", text: "The right style is the one you can follow consistently. Consider how much time you can spend at the screen, how you handle fast decisions, and how much spread you are willing to pay repeatedly." },
          { t: "ul", items: [
            "With a full-time job, swing trading on the 4-hour and daily charts is often easier to fit in.",
            "If you can focus for a few hours, day trading around the London and New York overlap is possible.",
            "Avoid mixing styles until one of them is stable.",
          ] },
        ],
      },
      {
        id: "tools",
        title: "A small toolkit",
        blocks: [
          { t: "ul", items: [
            "A charting platform for analysis.",
            "A broker account, demo first.",
            "An economic calendar.",
            "A position size calculator, such as the Risk Calculator on this site.",
            "A journal entry for every trade.",
          ] },
        ],
      },
    ],
    quiz: [
      q("Which style holds trades for days to weeks?", ["Scalping", "Swing trading", "Day trading"], 1, "Swing trading targets moves that last days to weeks."),
      q("Why does scalping make costs matter more?", ["It trades many times, so the spread is paid often", "It uses larger lot sizes", "Brokers charge more for short trades"], 0, "Each trade pays the spread, and a scalper makes many trades."),
      q("What is a sound first step after picking a style?", ["Add every available indicator", "Stick to one style and a small set of tools until it is stable", "Switch style after each loss"], 1, "Consistency lets you see whether the approach works."),
    ],
  },
};

export function getLessonBody(chapterN: number, slug: string): LessonBody | undefined {
  return lessonBodies[`${String(chapterN).padStart(2, "0")}-${slug}`];
}
