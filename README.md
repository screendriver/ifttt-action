# ifttt-action

[![GitHub Actions status](https://github.com/screendriver/ifttt-action/workflows/CI/badge.svg)](https://github.com/screendriver/ifttt-action/actions)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A GitHub action that triggers an [IFTTT webhooks](https://ifttt.com/maker_webhooks)
event. This is useful for example when you want to trigger a IFTTT webhook after
your deployment succeeds.

## Usage

See [action.yml](https://github.com/screendriver/ifttt-action/blob/main/action.yml)

```yaml
steps:
    - uses: screendriver/ifttt-action@v1
      with:
          event: your-webhook-event
          key: your-webhook-secret-key
```
