import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useDatePickerContext } from '../../context';
import { cx } from '../../../../shared/utils/cx';
import { getMonthNames, getYearOptions } from '../../utils';

interface CalendarHeaderProps {
  /** When showing multiple months, which panel index this is */
  panelIndex?: number;
  totalPanels?: number;
}

const PREV = '‹';
const NEXT = '›';

export function CalendarHeader({ panelIndex = 0, totalPanels = 1 }: CalendarHeaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<'month' | 'year' | null>(null);
  const {
    currentYear,
    currentMonth,
    setCurrentYear,
    setCurrentMonth,
    locale,
    showMonthYearSelectors = true,
    classNames,
    styles,
    renderNavButton,
    onMonthChange,
    onYearChange,
  } = useDatePickerContext() as ReturnType<typeof useDatePickerContext> & {
    renderNavButton?: (direction: 'prev' | 'next', onClick: () => void) => React.ReactNode;
  };

  // For multi-month panels, offset the displayed month
  const displayMonth = (currentMonth + panelIndex) % 12;
  const displayYear = currentYear + Math.floor((currentMonth + panelIndex) / 12);

  const monthNames = getMonthNames(locale);
  const yearOptions = getYearOptions(50);

  const showPrev = panelIndex === 0;
  const showNext = panelIndex === totalPanels - 1;

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    if (openMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [openMenu]);

  function movePanelBy(deltaMonths: number) {
    const absoluteMonth = currentYear * 12 + currentMonth + deltaMonths;
    const nextYear = Math.floor(absoluteMonth / 12);
    const nextMonth = ((absoluteMonth % 12) + 12) % 12;
    setCurrentMonth(nextMonth);
    setCurrentYear(nextYear);
    onMonthChange?.(nextMonth, nextYear);
  }

  function setDisplayedMonthYear(month: number, year: number) {
    const absoluteMonth = year * 12 + month - panelIndex;
    const nextYear = Math.floor(absoluteMonth / 12);
    const nextMonth = ((absoluteMonth % 12) + 12) % 12;
    setCurrentMonth(nextMonth);
    setCurrentYear(nextYear);
    onMonthChange?.(month, year);
  }

  function handleTriggerKeyDown(
    e: KeyboardEvent<HTMLSpanElement>,
    action: () => void,
  ) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  }

  function prevMonth() {
    movePanelBy(-1);
  }

  function nextMonth() {
    movePanelBy(1);
  }

  function selectMonth(month: number) {
    setDisplayedMonthYear(month, displayYear);
    setOpenMenu(null);
  }

  function selectYear(year: number) {
    setDisplayedMonthYear(displayMonth, year);
    onYearChange?.(year);
    setOpenMenu(null);
  }

  return (
    <div
      ref={rootRef}
      className={cx('fldp-calendar-header', classNames.calendarHeader)}
      style={styles.calendarHeader}
    >
      {showPrev
        ? renderNavButton
          ? renderNavButton('prev', prevMonth)
          : (
            <span
              onClick={prevMonth}
              onKeyDown={(e) => handleTriggerKeyDown(e, prevMonth)}
              aria-label="Previous month"
              role="button"
              tabIndex={0}
              className={cx('fldp-nav-button', classNames.navButton)}
              style={styles.navButton}
            >
              {PREV}
            </span>
          )
        : <span style={{ width: 28 }} />}

      <div className="fldp-month-year-selectors" style={styles.monthYearLabel}>
        {showMonthYearSelectors ? (
          <>
            <div className="fldp-header-field-group">
              <span
                className={cx('fldp-header-trigger', openMenu === 'month' && 'fldp-header-trigger--open')}
                role="button"
                tabIndex={0}
                aria-haspopup="listbox"
                aria-expanded={openMenu === 'month'}
                onClick={() => setOpenMenu(openMenu === 'month' ? null : 'month')}
                onKeyDown={(e) => handleTriggerKeyDown(e, () => setOpenMenu(openMenu === 'month' ? null : 'month'))}
              >
                <span className="fldp-header-trigger-label">{monthNames[displayMonth]}</span>
                <span className="fldp-header-trigger-caret" aria-hidden="true">▾</span>
              </span>

              {openMenu === 'month' && (
                <div className="fldp-header-menu" role="listbox" aria-label="Select month">
                  {monthNames.map((name, index) => (
                    <span
                      key={name}
                      className={cx('fldp-header-option', index === displayMonth && 'fldp-header-option--active')}
                      role="option"
                      aria-selected={index === displayMonth}
                      tabIndex={0}
                      onClick={() => selectMonth(index)}
                      onKeyDown={(e) => handleTriggerKeyDown(e, () => selectMonth(index))}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="fldp-header-field-group">
              <span
                className={cx('fldp-header-trigger', openMenu === 'year' && 'fldp-header-trigger--open')}
                role="button"
                tabIndex={0}
                aria-haspopup="listbox"
                aria-expanded={openMenu === 'year'}
                onClick={() => setOpenMenu(openMenu === 'year' ? null : 'year')}
                onKeyDown={(e) => handleTriggerKeyDown(e, () => setOpenMenu(openMenu === 'year' ? null : 'year'))}
              >
                <span className="fldp-header-trigger-label">{displayYear}</span>
                <span className="fldp-header-trigger-caret" aria-hidden="true">▾</span>
              </span>

              {openMenu === 'year' && (
                <div className="fldp-header-menu fldp-header-menu--year" role="listbox" aria-label="Select year">
                  {yearOptions.map((year) => (
                    <span
                      key={year}
                      className={cx('fldp-header-option', year === displayYear && 'fldp-header-option--active')}
                      role="option"
                      aria-selected={year === displayYear}
                      tabIndex={0}
                      onClick={() => selectYear(year)}
                      onKeyDown={(e) => handleTriggerKeyDown(e, () => selectYear(year))}
                    >
                      {year}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="fldp-month-year-label">
            {monthNames[displayMonth].toUpperCase()} {displayYear}
          </div>
        )}
      </div>

      {showNext
        ? renderNavButton
          ? renderNavButton('next', nextMonth)
          : (
            <span
              onClick={nextMonth}
              onKeyDown={(e) => handleTriggerKeyDown(e, nextMonth)}
              aria-label="Next month"
              role="button"
              tabIndex={0}
              className={cx('fldp-nav-button', classNames.navButton)}
              style={styles.navButton}
            >
              {NEXT}
            </span>
          )
        : <span style={{ width: 28 }} />}
    </div>
  );
}
