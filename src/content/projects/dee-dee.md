---
title: Dee Dee
summary: A machine-learning experiment that read penny-stock posts on Reddit and trained a recurrent neural network to spot pump-and-dump hype.
status: archived
started: 2020-06
ended: 2020-12
tags: [python, machine-learning, bot, web]
draft: true
links:
  repo: https://github.com/justin-oxford/dee-dee
---
Dee Dee (short for "due diligence") was how I taught myself machine learning in 2020. The question: can you see a penny stock being "pumped" in online communities before the price moves?

## How it worked

- **Data collection.** A Python bot pulled hot and new posts from r/RobinhoodPennyStocks and r/PennyStocks, matched them to ticker symbols, and joined them with price data from Finnhub. Everything went into MongoDB.
- **Model.** A Keras/TensorFlow recurrent network (LSTM layers) trained on the post and price history.
- **Dashboard.** A React page on the old justinoxford.com showed the tracked symbols with a ranking score (the "R-Index") and per-symbol model outputs such as the odds of a 10% move.

The plan ended with a genetic-algorithm trading strategy run against a paper-trading account, not real money.

## What was hard

Keeping the APIs well-behaved, making the pipeline fast enough, and cleaning up Reddit post text. Polling was eventually limited to once an hour to keep the server stable.

TODO(Justin): did the genetic algorithm or paper trading ever run, and what did you learn from the results?
