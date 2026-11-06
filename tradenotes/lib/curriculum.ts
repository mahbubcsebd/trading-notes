import type { Chapter, Group, Lesson, Level } from "./types";

/*
 * Curriculum outline: 18 chapters, 104 lessons.
 * Full lesson text lives in lib/lesson-bodies.ts (Chapter 1 is written in full).
 * To add text for any other lesson, add an entry there keyed by "<chapter number>-<lesson slug>".
 * Tuple: [slug, title, summary, minutes, takeaways, level?]
 */
type Row = [string, string, string, number, string[], Level?];

function chapter(
  n: number,
  slug: string,
  group: Group,
  title: string,
  headline: string,
  summary: string,
  level: Level,
  rows: Row[],
): Chapter {
  const lessons: Lesson[] = rows.map((r, i) => ({
    n: i + 1,
    slug: r[0],
    title: r[1],
    summary: r[2],
    minutes: r[3],
    takeaways: r[4],
    level: r[5] ?? level,
  }));
  return { n, slug, group, title, headline, summary, level, lessons };
}

export const chapters: Chapter[] = [
  chapter(1, "foundations", "foundations", "Foundations", "The language and architecture of Forex",
    "Pips, lots, leverage, spreads and sessions: the vocabulary every later chapter assumes. Take it in order and you will be able to read a price chart and work out what a trade costs.",
    "Beginner", [
      ["what-is-forex", "What is Forex", "Currency pairs, market mechanics and risk.", 6, [
        "A forex trade swaps one currency for another, so you always trade a pair.",
        "The quoted price is how much of the quote currency buys one unit of the base currency.",
        "The market has no central exchange and runs about 24 hours a day, five days a week.",
        "Leverage multiplies gains and losses by the same amount.",
      ]],
      ["market-participants", "Market participants", "Who drives order flow and liquidity.", 6, [
        "Central banks, commercial banks, funds, corporations and retail traders all trade, for different reasons.",
        "Large institutions supply most of the liquidity, so their orders move price more than yours will.",
        "Price often reacts around data releases and session opens because that is when large orders arrive.",
      ]],
      ["pips-lots-leverage-margin", "Pips, lots, leverage and margin", "Measure price distance and the capital a position needs.", 8, [
        "A pip is the standard unit of price change, usually 0.0001 (0.01 on JPY pairs).",
        "One standard lot is 100,000 units of the base currency, worth about $10 per pip on EURUSD.",
        "Margin is the deposit held to keep a position open: position value divided by leverage.",
      ], "Intermediate"],
      ["spread-commission-swap", "Spread, commission and swap", "The three costs that sit inside every trade.", 7, [
        "Spread is the gap between the bid and the ask, paid when you enter.",
        "Commission is a fixed fee per lot on some account types, usually in exchange for a tighter spread.",
        "Swap is overnight financing and can be a charge or a credit depending on the pair and direction.",
      ], "Intermediate"],
      ["trading-sessions", "Global trading sessions", "When liquidity and volatility peak across the day.", 5, [
        "The four main sessions are Sydney, Tokyo, London and New York.",
        "Volume and volatility peak when London and New York overlap.",
        "Session times shift by an hour with daylight saving, so check them against your own time zone.",
      ]],
      ["reading-a-price-chart", "Reading a price chart", "Candlesticks, timeframes and trend.", 8, [
        "A candle shows the open, high, low and close for one period.",
        "Lower timeframes show more noise; higher timeframes show the larger structure.",
        "An uptrend is a series of higher highs and higher lows; a downtrend is the reverse.",
      ]],
      ["trading-styles-platforms-tools", "Trading styles, platforms and tools", "Pick a style that fits your time and temperament.", 5, [
        "Scalping, day trading, swing trading and position trading differ mainly in how long a trade is held.",
        "Shorter styles pay the spread more often and need more screen time.",
        "Choose one style and a small set of tools before adding anything else.",
      ]],
    ]),

  chapter(2, "broker-platform-setup", "foundations", "Broker, Platform and Setup", "Choosing a broker and setting up your workspace",
    "What to check before you deposit, how accounts and orders work, and how to set up clean charts on a demo account first.",
    "Beginner", [
      ["choosing-a-broker", "Choosing a regulated broker", "What to check before you deposit.", 6, [
        "Check that the broker is licensed by a regulator you recognise and that the licence number can be verified.",
        "Look for segregated client funds and clear withdrawal terms.",
        "Compare spreads, commission and execution quality, not just the bonus on offer.",
      ]],
      ["account-types", "Account types and execution", "Standard, raw spread and how orders are filled.", 6, [
        "Standard accounts bundle costs into the spread; raw spread accounts charge a separate commission.",
        "Market execution fills at the best available price, which can differ slightly from the one you clicked.",
        "Choose the account type that matches how often you trade.",
      ]],
      ["demo-account", "Using a demo account", "Practise the mechanics without risking money.", 5, [
        "A demo account uses live prices with virtual money.",
        "Use it to learn the platform and test a routine, not to judge a strategy from a few trades.",
        "Fills on a demo can be cleaner than live trading, so expect some difference.",
      ]],
      ["charting-platforms", "Charting platforms", "What TradingView and MetaTrader are each for.", 7, [
        "TradingView is a charting and analysis tool; MetaTrader is a broker-connected trading terminal.",
        "Many traders analyse on one and execute on the other.",
        "Learn one platform well before adding a second.",
      ]],
      ["order-types", "Order types", "Market, limit, stop and what each does.", 7, [
        "A market order fills now at the current price.",
        "A limit order waits for a better price; a stop order triggers when price reaches a level.",
        "Every order needs a stop loss and a take profit decided before you click.",
      ]],
      ["workspace-setup", "Setting up your workspace", "Charts, timeframes and a clean layout.", 5, [
        "Keep a small watchlist; two or three instruments are enough to start.",
        "Use the same chart template every time so your eyes learn what to look for.",
        "Remove anything on the chart that you cannot explain.",
      ]],
    ]),

  chapter(3, "market-structure", "foundations", "Market Structure", "Reading the swings that make a trend",
    "Swing points, trends and ranges, breaks of structure and where liquidity sits. The map you draw before any entry.",
    "Beginner", [
      ["swing-highs-and-lows", "Swing highs and swing lows", "The turning points that define structure.", 6, [
        "A swing high is a peak with lower highs on both sides; a swing low is the mirror image.",
        "Structure is built from these points, not from every candle.",
        "Mark them on a higher timeframe first, then drop down.",
      ]],
      ["trends-and-ranges", "Trends and ranges", "Telling a trend from a sideways market.", 6, [
        "An uptrend makes higher highs and higher lows; a downtrend makes lower highs and lower lows.",
        "A range moves between a ceiling and a floor without a clear direction.",
        "Markets spend a lot of time in ranges, so waiting is a valid decision.",
      ]],
      ["break-of-structure", "Break of structure", "When a trend continues past a key swing.", 7, [
        "A break of structure is a close beyond the last swing high in an uptrend, or the last swing low in a downtrend.",
        "It suggests the trend is continuing.",
        "A wick beyond a level is weaker evidence than a candle close beyond it.",
      ], "Intermediate"],
      ["change-of-character", "Change of character", "The first sign a trend may be turning.", 7, [
        "A change of character is a break of the swing that was holding the trend, such as a lower low in an uptrend.",
        "It is an early warning, not a confirmed reversal.",
        "Wait for the market to build a new sequence before acting on it.",
      ], "Intermediate"],
      ["liquidity-and-equal-highs", "Liquidity and equal highs", "Where stop orders tend to cluster.", 7, [
        "Stop losses cluster above recent highs and below recent lows.",
        "Equal highs or lows are obvious places for that liquidity to sit.",
        "Price often moves through these areas quickly before deciding direction.",
      ], "Intermediate"],
      ["multi-timeframe-structure", "Multi-timeframe structure", "Reading the big picture before the entry.", 7, [
        "Start on a higher timeframe to find direction and key levels.",
        "Move down to a lower timeframe to time the entry.",
        "If the timeframes disagree, reduce size or stand aside.",
      ], "Intermediate"],
    ]),

  chapter(4, "candlesticks", "foundations", "Candlesticks", "What each candle records, and what it does not",
    "Candle anatomy and the single, double and triple candle patterns, with the context that decides whether a pattern means anything.",
    "Beginner", [
      ["candle-anatomy", "Candlestick anatomy", "Body, wicks and what they record.", 5, [
        "The body shows the distance between open and close; wicks show the extremes.",
        "Long wicks show price was pushed back from a level.",
        "Where a candle closes within its range shows who finished the period in control.",
      ]],
      ["single-candle-patterns", "Single candle patterns", "Doji, hammer and shooting star.", 6, [
        "A doji has almost no body and signals indecision.",
        "A hammer has a small body and a long lower wick; a shooting star is the mirror image.",
        "These matter most at a key level after a move.",
      ]],
      ["two-candle-patterns", "Two candle patterns", "Engulfing, harami, piercing line and dark cloud cover.", 7, [
        "An engulfing candle has a body that covers the previous candle's body.",
        "A harami is a small candle held inside the previous candle's body.",
        "Piercing line and dark cloud cover close past the midpoint of the previous body.",
      ]],
      ["three-candle-patterns", "Three candle patterns", "Morning star and evening star.", 6, [
        "A morning star is a down candle, a small candle, then a strong up candle.",
        "An evening star is the mirror image at the top of a move.",
        "The third candle's close is the confirmation.",
      ]],
      ["candles-in-context", "Candles in context", "Why a pattern alone is not a signal.", 6, [
        "The same pattern means different things at a key level and in the middle of nowhere.",
        "Check trend, level and timeframe before reading the candle.",
        "Patterns fail often; plan the trade for when they do.",
      ]],
    ]),

  chapter(5, "support-resistance", "foundations", "Support and Resistance", "Levels where price has turned before",
    "How to find and draw levels, why they are zones, what happens when they break, and how to trade the reaction.",
    "Beginner", [
      ["drawing-levels", "Drawing support and resistance", "Finding levels worth marking.", 6, [
        "Levels come from areas where price turned several times.",
        "Mark them on higher timeframes first.",
        "Fewer, clearer levels beat a chart full of lines.",
      ]],
      ["zones-not-lines", "Zones, not single lines", "Why a level is an area.", 6, [
        "Price rarely reverses at one exact value.",
        "Draw a zone from the wick extremes to the typical body closes.",
        "Use the zone width to size your stop loss.",
      ]],
      ["role-reversal", "Role reversal", "When support becomes resistance.", 6, [
        "A broken support often acts as resistance when price returns to it, and the reverse.",
        "The more times a level held, the more attention it gets when it breaks.",
        "A retest that holds is a reason to look for a trade, not a guarantee.",
      ]],
      ["round-numbers", "Round numbers and psychological levels", "Why prices ending in 00 and 50 matter.", 5, [
        "Prices ending in 00 and 50 draw attention in most markets.",
        "Orders often cluster at round numbers, so price can pause or reverse there.",
        "Treat them as zones and combine them with structure.",
      ]],
      ["trading-reactions-at-levels", "Trading reactions at levels", "Bounce, break and retest.", 7, [
        "A bounce trades the level holding; a breakout trades it failing.",
        "A break and retest waits for price to return and confirm.",
        "False breakouts are common, so define where the idea is wrong before entry.",
      ]],
    ]),

  chapter(6, "trend-chart-patterns", "strategy", "Trend and Chart Patterns", "Trendlines, continuation and reversal patterns",
    "Trendlines and channels, the patterns that pause a trend, the patterns that end one, and what to do when they fail.",
    "Intermediate", [
      ["trendlines-and-channels", "Trendlines and channels", "Framing a trend with lines.", 6, [
        "Draw a trendline through at least two swing points and treat a third touch as confirmation.",
        "A channel adds a parallel line to frame the range of the trend.",
        "A break of a steep trendline often leads to a slower trend, not a reversal.",
      ]],
      ["continuation-patterns", "Continuation patterns", "Flags, pennants and triangles.", 7, [
        "Continuation patterns are pauses inside a trend.",
        "Flags and pennants follow a strong move; triangles compress price between converging lines.",
        "The trade is the break in the trend's direction, with the stop on the other side of the pattern.",
      ]],
      ["reversal-patterns", "Reversal patterns", "Double tops, double bottoms and head and shoulders.", 7, [
        "Reversal patterns need an existing trend to reverse.",
        "The neckline break is the trigger, not the pattern's shape.",
        "Measure the pattern height for a rough target, then plan partial exits.",
      ]],
      ["failed-patterns", "When patterns fail", "Using a failure as information.", 5, [
        "Every pattern fails some of the time.",
        "A failure can be a signal in the opposite direction.",
        "Position sizing, not pattern choice, decides how much a failure costs.",
      ]],
    ]),

  chapter(7, "technical-indicators", "strategy", "Technical Indicators", "Using indicators without cluttering the chart",
    "What indicators calculate, how moving averages, RSI, MACD, Bollinger Bands and ATR work, and how to combine them sensibly.",
    "Intermediate", [
      ["what-indicators-do", "What indicators do", "Maths applied to price, nothing more.", 5, [
        "Indicators are calculations on past price and sometimes volume.",
        "They lag price; they do not predict it.",
        "Use one or two that answer a specific question.",
      ]],
      ["moving-averages", "Moving averages", "Smoothing price to see direction.", 7, [
        "A simple moving average is the mean of the last N closes; an exponential average weights recent closes more.",
        "Price above a rising average suggests an uptrend.",
        "Averages work best in trends and badly in ranges.",
      ]],
      ["rsi", "Relative Strength Index", "Momentum on a 0 to 100 scale.", 7, [
        "RSI measures the speed of recent moves on a 0 to 100 scale.",
        "Readings above 70 or below 30 show strong momentum, not an automatic reversal.",
        "In a strong trend, RSI can stay extreme for a long time.",
      ]],
      ["macd", "MACD", "Momentum from two moving averages.", 7, [
        "MACD is the gap between a fast and a slow exponential average, shown with a signal line.",
        "A crossover shows momentum shifting after the move has already started.",
        "Divergence with price is a warning that needs structure to confirm it.",
      ]],
      ["bollinger-bands", "Bollinger Bands", "Volatility drawn around an average.", 6, [
        "Bands sit a set number of standard deviations above and below a moving average.",
        "Narrow bands show low volatility; wide bands show high volatility.",
        "Price touching a band is not a signal by itself.",
      ]],
      ["atr-and-volatility", "ATR and volatility", "Sizing stops to current conditions.", 6, [
        "Average True Range measures the typical size of a candle.",
        "A stop placed inside normal ATR noise is likely to be hit.",
        "Use ATR to scale stop distance and position size to the market.",
      ]],
      ["indicator-confluence", "Indicator confluence", "Combining tools without clutter.", 6, [
        "Confluence means several independent reasons point the same way.",
        "Indicators built from the same price data are not independent.",
        "Two or three tools with clear roles are enough.",
      ]],
    ]),

  chapter(8, "risk-management", "strategy", "Risk Management", "Staying in the game long enough for an edge to show",
    "Risk per trade, position sizing, stop placement, reward to risk, expectancy, drawdown, exposure and leverage.",
    "Intermediate", [
      ["risk-per-trade", "Risk per trade", "How much to lose when you are wrong.", 6, [
        "Decide a fixed percentage of the account to risk per trade, often 1% or less.",
        "Risk is the distance to the stop multiplied by position size.",
        "A fixed percentage keeps losses survivable.",
      ]],
      ["position-sizing", "Position sizing", "From risk amount to lot size.", 8, [
        "Lot size equals risk amount divided by stop distance times value per unit of distance.",
        "A wider stop means a smaller size, not a bigger risk.",
        "Calculate size before entry, every time.",
      ]],
      ["stop-loss-placement", "Stop loss placement", "Where the idea is proven wrong.", 7, [
        "Place the stop where the trade idea is invalid, not where the loss feels comfortable.",
        "Give the stop room beyond the level and beyond normal volatility.",
        "Never widen a stop after entry.",
      ]],
      ["risk-reward-ratio", "Risk to reward", "Comparing target distance with stop distance.", 6, [
        "Reward to risk compares the target distance to the stop distance.",
        "At 1:2, roughly a third of trades need to win to break even, before costs.",
        "Take targets from structure, not from a ratio you want.",
      ]],
      ["win-rate-and-expectancy", "Win rate and expectancy", "What a system earns per trade on average.", 8, [
        "Expectancy is win rate times average win, minus loss rate times average loss.",
        "A low win rate can be profitable with a high reward to risk, and the reverse.",
        "You need a large sample of trades before the numbers mean anything.",
      ]],
      ["drawdown-and-recovery", "Drawdown and recovery", "Why deep losses are so costly.", 7, [
        "Drawdown is the fall from an account's peak.",
        "A 50% loss needs a 100% gain to recover, so deep drawdowns are very costly.",
        "Cut size after a run of losses instead of increasing it.",
      ]],
      ["correlation-and-exposure", "Correlation and total exposure", "When two trades are really one.", 6, [
        "Correlated instruments move together, so two trades can be one bet.",
        "Add up risk across open trades, not trade by trade.",
        "A daily or weekly loss limit protects the account from a bad stretch.",
      ]],
      ["leverage-in-practice", "Leverage in practice", "Why available leverage is not a target.", 6, [
        "Leverage sets how large a position you can open, not how large it should be.",
        "High leverage leaves little room before a margin call.",
        "Size by risk first, then check that margin is comfortable.",
      ]],
    ]),

  chapter(9, "price-action-entries", "strategy", "Price Action Entries", "Turning structure into a defined entry",
    "Breakout, retest, pullback and rejection entries, how much confirmation to wait for, and when to skip the trade.",
    "Intermediate", [
      ["breakout-entries", "Breakout entries", "Entering when price leaves a range.", 6, [
        "A breakout entry triggers when price closes beyond a level or range.",
        "Waiting for a close rather than a wick filters out some false breaks.",
        "Place the stop back inside the range.",
      ]],
      ["retest-entries", "Retest entries", "Entering when a broken level holds.", 6, [
        "A retest entry triggers when price returns to a broken level and holds.",
        "You get a closer stop but may miss trades that never return.",
        "Look for rejection candles at the level.",
      ]],
      ["pullback-entries", "Pullback entries in a trend", "Joining a trend after a pause.", 7, [
        "A pullback is a pause against the trend, and the entry is where it ends.",
        "Common areas are prior structure, a moving average or a trendline.",
        "Skip the trade if the pullback breaks the structure.",
      ]],
      ["rejection-entries", "Rejection at key levels", "Reading wicks at a level.", 6, [
        "A rejection shows as a long wick and a close back away from the level.",
        "The wick extreme becomes the invalidation point.",
        "Combine it with a higher-timeframe level.",
      ]],
      ["entry-confirmation", "Confirmation and timing", "Trading certainty for a worse price.", 6, [
        "More confirmation gives more certainty and a worse price.",
        "Decide before the trade which signal you need.",
        "Use the same trigger each time so results can be compared.",
      ]],
      ["when-not-to-enter", "When not to enter", "The trades worth skipping.", 5, [
        "No clear level, no clear stop, no trade.",
        "Skip the minutes around major news.",
        "A missed trade costs nothing; a bad entry does.",
      ]],
    ]),

  chapter(10, "trade-management-execution", "strategy", "Trade Management and Execution", "From order ticket to exit",
    "Entry orders, moving stops, partial profits, exits and what slippage does to your fills.",
    "Intermediate", [
      ["entry-orders", "Placing entry orders", "Limit, stop and market entries in practice.", 5, [
        "Use limit orders to enter at a level and stop orders to enter on a break.",
        "Set the stop loss and take profit with the order.",
        "Check the spread before sending.",
      ]],
      ["moving-stops", "Moving your stop", "When to protect a trade and when to leave it.", 6, [
        "Move a stop to break-even only when structure supports it.",
        "Trailing too tightly turns winners into scratches.",
        "Trail behind swing points, not behind price.",
      ]],
      ["partial-profits", "Taking partial profits", "Banking some gain on the way.", 6, [
        "Closing part of a position locks in some gain and reduces risk.",
        "It lowers the average reward on the full trade.",
        "Decide the plan before entry.",
      ]],
      ["exits-and-targets", "Exits and targets", "Where to take profit.", 6, [
        "Targets belong at the next structure level.",
        "An exit can also be the idea failing before the stop is hit.",
        "Do not chase a trade after the target is reached.",
      ]],
      ["slippage-and-execution", "Slippage and execution", "Why fills differ from clicks.", 6, [
        "Slippage is the difference between the price you expected and the price you got.",
        "It is larger around news and in thin markets.",
        "A stop fills at the next available price, which can be worse than the stop level.",
      ]],
    ]),

  chapter(11, "fundamental-analysis", "strategy", "Fundamental Analysis", "The economy behind the price",
    "The economic calendar, central banks and rates, inflation and jobs, growth and sentiment, and how to handle news.",
    "Intermediate", [
      ["economic-calendar", "The economic calendar", "Scheduled releases and what they mean.", 5, [
        "The calendar lists scheduled releases with an expected and a previous value.",
        "Impact ratings show which events usually move price.",
        "Price reacts to the surprise against expectations, not to the number alone.",
      ]],
      ["central-banks-and-rates", "Central banks and interest rates", "Why rate expectations move currencies.", 7, [
        "Central banks set policy rates and guide expectations.",
        "Higher rates relative to other countries tend to support a currency.",
        "Markets move on what is expected next, not only on the current rate.",
      ]],
      ["inflation-and-employment", "Inflation and employment", "The data that shapes rate decisions.", 6, [
        "Inflation and jobs data shape rate expectations.",
        "Strong data can lift a currency if it raises rate expectations.",
        "Look at the trend across releases, not one print.",
      ]],
      ["growth-and-sentiment", "Growth data and sentiment", "GDP, retail sales and surveys.", 5, [
        "GDP, retail sales and PMI surveys describe the direction of the economy.",
        "Sentiment changes quickly and is hard to time.",
        "Use growth data as background, not as an entry signal.",
      ]],
      ["risk-on-risk-off", "Risk-on and risk-off", "How money moves with the mood of the market.", 5, [
        "In risk-off periods, money often moves toward the US dollar, the yen, the Swiss franc and gold.",
        "In risk-on periods, it moves toward higher-yielding assets.",
        "Correlations shift over time; test them rather than assume them.",
      ]],
      ["trading-around-news", "Trading around news", "Spreads, slippage and a plan.", 6, [
        "Spreads widen and slippage rises around major releases.",
        "Many traders stay flat through the release and trade the structure after it.",
        "If you hold a position, size it for a larger-than-normal move.",
      ]],
    ]),

  chapter(12, "trading-psychology", "mastery", "Trading Psychology", "Making the plan survive your own emotions",
    "Why behaviour decides results, how fear and greed show up, overtrading, routine, losing streaks and confidence.",
    "Intermediate", [
      ["why-psychology-matters", "Why psychology matters", "Most errors are behavioural.", 5, [
        "Most trading errors are behavioural, not analytical.",
        "Rules written in advance beat decisions made under pressure.",
        "Knowing the right action and doing it are different skills.",
      ]],
      ["fear-and-greed", "Fear and greed", "How they show up on the chart.", 6, [
        "Fear cuts winners short and avoids valid setups; greed adds size and removes stops.",
        "Both show up as breaking your own rules.",
        "Name the feeling, then return to the checklist.",
      ]],
      ["overtrading-and-revenge-trading", "Overtrading and revenge trading", "Two ways to turn a bad day into a worse one.", 6, [
        "Overtrading is trading from boredom or the wish to be active.",
        "Revenge trading is trying to win back a loss immediately.",
        "A daily trade limit and a daily loss limit stop both.",
      ]],
      ["discipline-and-routine", "Discipline and routine", "Reducing decisions made while emotional.", 6, [
        "A fixed routine reduces decisions made while emotional.",
        "Prepare before the session and review after it.",
        "Sleep, breaks and screen limits affect decision quality.",
      ]],
      ["handling-losing-streaks", "Handling losing streaks", "What to do when nothing works.", 6, [
        "Losing streaks happen even with a sound edge.",
        "Reduce size or pause to review instead of forcing a recovery.",
        "Check whether you followed your rules before changing them.",
      ]],
      ["confidence-from-process", "Confidence from process", "Judging the work, not the last result.", 5, [
        "Confidence should come from following a tested process, not from the last result.",
        "Judge a trade by whether you followed the plan, not by the outcome.",
        "Track a process score alongside profit and loss.",
      ]],
    ]),

  chapter(13, "gold-xauusd", "mastery", "Gold (XAUUSD)", "How gold trades, and what is different about it",
    "What moves gold, its link to the dollar and real yields, contract size and pip value, sessions, costs, key levels and news.",
    "Intermediate", [
      ["what-moves-gold", "What moves gold", "The main drivers in plain terms.", 6, [
        "Gold pays no interest, so it competes with what cash and bonds pay.",
        "It is also a store of value in uncertain periods.",
        "Central bank buying and investor flows influence it over longer periods.",
      ]],
      ["gold-and-the-us-dollar", "Gold and the US dollar", "Why a stronger dollar often weighs on gold.", 6, [
        "Gold is priced in dollars, so a stronger dollar often weighs on it.",
        "The relationship is common but not constant.",
        "Check the dollar's trend before trading gold.",
      ]],
      ["real-yields-and-rates", "Real yields and interest rates", "The cost of holding gold.", 7, [
        "Real yield is the bond yield minus expected inflation.",
        "Rising real yields raise the cost of holding gold and often pressure it.",
        "Watch rate expectations around central bank meetings.",
      ]],
      ["safe-haven-demand", "Safe-haven demand", "When stress brings buyers.", 5, [
        "Gold often attracts buyers during market stress.",
        "The reaction depends on what else is moving, including the dollar and yields.",
        "Do not assume every headline lifts gold.",
      ]],
      ["gold-contract-and-pip-value", "Contract size and pip value", "What one lot of gold is worth per move.", 7, [
        "On most brokers one lot of XAUUSD is 100 ounces.",
        "A $1 move in price is worth about $100 per lot.",
        "Confirm contract size and minimum lot with your broker.",
      ]],
      ["gold-sessions-and-volatility", "Sessions and volatility", "When gold moves most.", 6, [
        "Gold is most active when London and New York are open.",
        "Volatility can be high around US data releases.",
        "Size stops to the current ATR, not to a fixed number of points.",
      ]],
      ["gold-spreads-and-costs", "Spreads and costs on gold", "Why costs matter more here.", 5, [
        "Gold spreads are wider than on major forex pairs and widen further around news.",
        "Costs matter more for short-term trades.",
        "Compare cost per lot, not only the quoted spread.",
      ]],
      ["gold-key-levels", "Key levels on gold", "Zones, not lines.", 6, [
        "Whole-number levels and previous highs and lows often act as reference points.",
        "Use higher-timeframe zones and keep stops outside them.",
        "Large daily ranges mean levels are zones, not lines.",
      ]],
      ["gold-and-news", "Trading gold around news", "US data, rate decisions and a plan.", 6, [
        "US inflation, jobs and rate decisions can move gold sharply.",
        "Spreads and slippage rise, so reduce size or stand aside.",
        "Plan the trade before the release, not during it.",
      ]],
      ["gold-trade-walkthrough", "Gold trade walkthrough", "From context to review, step by step.", 8, [
        "Start with the higher-timeframe direction and level.",
        "Define entry, stop and target, then size the position from the risk.",
        "Review the trade afterwards against the plan.",
      ]],
    ]),

  chapter(14, "trading-plan-system", "mastery", "Trading Plan and System", "Writing down how you trade",
    "What a plan contains, how to define a setup, entry and exit rules, a daily checklist and how to review the plan.",
    "Advanced", [
      ["what-a-plan-contains", "What a trading plan contains", "The parts of a plan.", 6, [
        "A plan covers markets, sessions, setups, risk rules and review.",
        "Write it down so you can check against it.",
        "Keep it short enough to follow.",
      ]],
      ["defining-your-setup", "Defining your setup", "Where, what you see, and what you do.", 7, [
        "A setup is a repeatable condition: where, what you see, and what you do.",
        "Write the entry, stop and target rules in plain words.",
        "If you cannot describe it clearly, you cannot test it.",
      ]],
      ["entry-and-exit-rules", "Entry and exit rules", "Rules two people would apply the same way.", 6, [
        "Rules should be specific enough that two people would take the same trade.",
        "Include what makes a trade invalid.",
        "Add a rule for when to stop for the day.",
      ]],
      ["daily-routine-and-checklist", "Daily routine and checklist", "Catching mistakes before they cost money.", 6, [
        "A pre-trade checklist catches mistakes before they cost money.",
        "Prepare levels and the calendar before the session.",
        "Review the day, even when you did not trade.",
      ]],
      ["reviewing-your-plan", "Reviewing and updating your plan", "Changing it on purpose, not on impulse.", 5, [
        "Review on a schedule, such as weekly or monthly.",
        "Change one thing at a time and record why.",
        "Do not rewrite the plan in the middle of a losing run.",
      ]],
    ]),

  chapter(15, "backtesting-journal", "mastery", "Backtesting and Journal", "Checking an idea before and after you trade it",
    "What backtesting is, how to do it by hand, forward testing, keeping a journal and reading your statistics.",
    "Advanced", [
      ["what-backtesting-is", "What backtesting is", "Applying rules to past data.", 5, [
        "Backtesting applies your rules to past data to see how they would have done.",
        "It shows whether an idea is worth forward testing, not whether it will work.",
        "Costs and slippage must be included.",
      ]],
      ["manual-backtesting", "Manual backtesting step by step", "One candle at a time.", 8, [
        "Scroll the chart forward one candle at a time and take trades only by your rules.",
        "Record entry, stop, target and result for each trade.",
        "Aim for a large sample, often 100 trades or more, before drawing conclusions.",
      ]],
      ["forward-testing", "Forward testing on a demo", "Live prices, no risk.", 6, [
        "Forward testing runs the rules on live prices without risking money.",
        "It checks that you can follow the plan in real time.",
        "Move to small live size only after steady results.",
      ]],
      ["trade-journal", "Keeping a trade journal", "What to record and why.", 6, [
        "Record the setup, reason, entry, stop, target, result and a screenshot.",
        "Add notes on how you felt and whether you followed the plan.",
        "A journal you never review is only a record.",
      ]],
      ["reading-your-statistics", "Reading your statistics", "What the numbers can and cannot say.", 7, [
        "Track win rate, average win, average loss, expectancy and maximum drawdown.",
        "Compare results by setup and by session.",
        "Small samples mislead, so be careful with early results.",
      ]],
    ]),

  chapter(16, "advanced-concepts", "mastery", "Advanced Concepts", "Order blocks, imbalances and liquidity",
    "Order blocks, fair value gaps, premium and discount, liquidity sweeps and session-based models, with their limits.",
    "Advanced", [
      ["order-blocks", "Order blocks", "The last opposing candle before a strong move.", 7, [
        "An order block is the last opposing candle before a strong move.",
        "Traders watch it as an area where price may react on return.",
        "It is an interpretation, so confirm it with structure and risk limits.",
      ]],
      ["fair-value-gaps", "Fair value gaps", "Three-candle imbalances.", 7, [
        "A fair value gap is a three-candle imbalance where the wicks of the first and third candles do not overlap.",
        "Price often returns to fill part of it.",
        "Not every gap gets filled, so treat it as an area to watch.",
      ]],
      ["premium-and-discount", "Premium and discount", "Using the midpoint of a range.", 6, [
        "Split a swing range at its midpoint: above is premium, below is discount.",
        "Traders prefer to buy in discount and sell in premium.",
        "It is a filter for location, not a signal.",
      ]],
      ["liquidity-sweeps", "Liquidity sweeps", "Moves beyond a high or low that reverse.", 7, [
        "A sweep is a quick move beyond a prior high or low that then reverses.",
        "It can mark a false breakout.",
        "Wait for structure to confirm before acting.",
      ]],
      ["session-based-models", "Session-based models", "Using the Asian range and the London open.", 6, [
        "Some models mark the Asian range and watch for a move during London.",
        "Define the rules and test them before using them live.",
        "Session times shift with daylight saving.",
      ]],
    ]),

  chapter(17, "case-studies-trade-reviews", "mastery", "Case Studies and Trade Reviews", "Reviewing trades the way you will review your own",
    "Worked examples in the review format: context, plan, result, and what to keep or change.",
    "Advanced", [
      ["case-gold-retest", "Case study: a gold retest", "Context, level, entry, stop and target.", 8, [
        "Walk through the higher-timeframe context, level, entry, stop and target.",
        "Compare the plan to what happened.",
        "Note what you would repeat and what you would change.",
      ]],
      ["case-stopped-out", "Case study: a stopped-out trade", "A loss that followed the plan.", 8, [
        "A loss that followed the plan is a good trade.",
        "Separate the decision from the outcome.",
        "Look for what was knowable before entry.",
      ]],
      ["case-news-day", "Case study: a news day", "Before and after a release.", 8, [
        "Describe the setup before the release and the reaction after it.",
        "Review spread, slippage and size.",
        "Decide in advance whether you will trade the release.",
      ]],
    ]),

  chapter(18, "notes-library", "mastery", "Notes Library", "Checklists and cheat sheets to keep open",
    "Short reference notes: a pre-trade checklist, a weekly review template, risk formulas, a pattern cheat sheet and a study roadmap.",
    "Beginner", [
      ["pre-trade-checklist", "Pre-trade checklist", "Six checks before every entry.", 4, [
        "Check direction, level, stop, target, size and news before entry.",
        "If any answer is unclear, skip the trade.",
        "Keep it to one screen.",
      ]],
      ["weekly-review-template", "Weekly review template", "A fixed way to review each week.", 4, [
        "Review trades, rule breaks and market notes each week.",
        "Pick one thing to improve.",
        "Compare to the previous week.",
      ]],
      ["risk-formulas", "Risk formulas cheat sheet", "The few formulas you use daily.", 4, [
        "Risk amount = balance × risk percent.",
        "Lot size = risk amount ÷ (stop distance × value per unit of distance).",
        "Expectancy = win rate × average win − loss rate × average loss.",
      ]],
      ["pattern-cheat-sheet", "Pattern cheat sheet", "Candlestick patterns in one view.", 4, [
        "Single, double and triple candle patterns in one view.",
        "Each pattern is a clue, not a signal.",
        "See the Candlestick Patterns library for diagrams.",
      ]],
      ["study-roadmap", "Study roadmap", "What to study in what order.", 4, [
        "Work through chapters 1 to 5 before trading live.",
        "Use a demo account through chapters 6 to 11.",
        "Return to your journal and review it often.",
      ]],
    ]),
];

export const groups: { id: Group; label: string; blurb: string; range: string }[] = [
  { id: "foundations", label: "Foundations", range: "01 – 05", blurb: "How the market works, your platform, structure, candles and key levels." },
  { id: "strategy", label: "Strategy and execution", range: "06 – 11", blurb: "Patterns, indicators, risk, entries, trade management and macro." },
  { id: "mastery", label: "Mastery", range: "12 – 18", blurb: "Psychology, gold, your own system, backtesting and real reviews." },
];

export const totalLessons = chapters.reduce((s, c) => s + c.lessons.length, 0);

export const pad = (n: number) => String(n).padStart(2, "0");

export function getChapter(slug: string) {
  return chapters.find((c) => c.slug === slug);
}

export function getLesson(chapterSlug: string, lessonSlug: string) {
  const ch = getChapter(chapterSlug);
  const lesson = ch?.lessons.find((l) => l.slug === lessonSlug);
  return ch && lesson ? { chapter: ch, lesson } : undefined;
}

export function lessonHref(c: { slug: string }, l: { slug: string }) {
  return `/learn/${c.slug}/${l.slug}`;
}

/** Previous and next lessons across chapter boundaries. */
export function neighbours(chapterSlug: string, lessonSlug: string) {
  const flat = chapters.flatMap((c) => c.lessons.map((l) => ({ c, l })));
  const i = flat.findIndex((x) => x.c.slug === chapterSlug && x.l.slug === lessonSlug);
  return { prev: i > 0 ? flat[i - 1] : undefined, next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : undefined };
}
