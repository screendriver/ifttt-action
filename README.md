# ifttt-action

[![GitHub Actions status](https://github.com/screendriver/ifttt-action/workflows/CI/badge.svg)](https://github.com/screendriver/ifttt-action/actions)

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
