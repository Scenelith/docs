---
title: "Choose a path"
description: "Checks one explicit JSON-typed rule without silently converting text, numbers or booleans. Complete settings, connections, runtime behavior and usage guidance."
---

# Choose a path

`logic.condition@3`

## What this node does

Checks one explicit JSON-typed rule without silently converting text, numbers or booleans.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Logic | No | Yes |

## When to use it

Use this when the workflow must choose between two paths based on one visible rule.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Information to check `data` | `data` | Required · Single connection · Connectable |
| Output | Rule matches `yes` | `data` | Typed output · Connectable |
| Output | Rule does not match `no` | `data` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **What should be checked?** `path`<br/>Enter the field name from the incoming result. Leave empty to check the whole result. Placeholder: Example: review.approved | `text` | Optional · Fixed only | `` |
| **What must match?** `operator`<br/>True, false and numeric rules require values of the same real JSON type; text is never converted for comparison. | `select` | Optional · Fixed only | Is exactly true (`is-true`) / Is exactly false (`is-false`) / Is empty (`is-empty`) / Is not empty (`is-not-empty`) / Equals this value (`equals`) / Does not equal this value (`not-equals`) / Contains this value (`contains`) / Is greater than (`greater-than`) / Is less than (`less-than`) |
| **Compare with** `compareValue`<br/>Use text for text rules, a real number for numeric rules, or true/false for boolean equality. Placeholder: Example: approved, 10, or true | `value` | Optional · Fixed only · visible when `operator` is "equals" / "not-equals" / "contains" / "greater-than" / "less-than" | `null` |

## How to configure it

1. Connect the information to inspect.
2. Enter the field to check, such as review.approved.
3. Choose the rule and comparison value when needed.
4. Connect Rule matches and Rule does not match to different next steps.

## Example flow

**Review result → Generate images or Repair plan**

Approved data follows the yes path. Everything else follows the no path, so no outcome is hidden.

## What happens at run time

- Evaluates one deterministic predicate and passes the original incoming value unchanged.
- Contains is case-sensitive for text and checks exact items in a list. Empty lists and objects should use the explicit empty rules rather than the yes / true rule.

## Practical notes

- Name the card after the decision, for example Is the plan approved?
- Always connect or intentionally finish both paths.
