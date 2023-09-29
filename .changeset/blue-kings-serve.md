---
'react-select': minor
---

1. Added 'aria-activedescendant' for input and functionality to calculate it;
2. Added role 'option' and 'aria-selected' for option;
3. Added role 'listbox' for menu;
4. Added tests for 'aria-activedescendant';
5. Changes in aria-live region:

- the instructions how to use select will be announced only one time when user focuses the input for the first time.
- instructions for menu or selected value will be announced only once after focusing them.
- removed aria-live for focused option because currently with correct aria-attributes it will be announced by screenreader natively as well as the status of this option (active or disabled).
- separated ariaContext into ariaFocused, ariaResults, ariaGuidance to avoid announcing redundant information and higlight only current change.
