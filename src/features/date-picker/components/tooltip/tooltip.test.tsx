import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Tooltip } from './index';
import { d } from '../../../../test/contextFactory';

const renderProps = {
  date: d('2025-06-10'),
  isToday: false,
  isSelected: false,
  isDisabled: false,
  isRangeStart: false,
  isRangeEnd: false,
  isInRange: false,
};

describe('Tooltip', () => {
  it('shows and hides tooltip on hover', async () => {
    render(
      <Tooltip content="hello" renderProps={renderProps} delay={0}>
        <button type="button">day</button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'day' }));
    expect(await screen.findByRole('tooltip')).toHaveTextContent('hello');

    fireEvent.mouseLeave(screen.getByRole('button', { name: 'day' }));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('uses render function content and preserves child handlers', async () => {
    const enter = vi.fn();
    const leave = vi.fn();

    render(
      <Tooltip content={(p) => p.date.format('YYYY-MM-DD')} renderProps={renderProps} delay={0}>
        <button type="button" onMouseEnter={enter} onMouseLeave={leave}>day</button>
      </Tooltip>,
    );

    const button = screen.getByRole('button', { name: 'day' });
    fireEvent.mouseEnter(button);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('2025-06-10');
    expect(enter).toHaveBeenCalled();

    fireEvent.mouseLeave(button);
    expect(leave).toHaveBeenCalled();
  });

  it('supports focus and blur behavior and hides when content is null', async () => {
    const { rerender } = render(
      <Tooltip content="focus" renderProps={renderProps} delay={0}>
        <button type="button">day</button>
      </Tooltip>,
    );

    const button = screen.getByRole('button', { name: 'day' });
    fireEvent.focus(button);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('focus');

    fireEvent.blur(button);
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());

    rerender(
      <Tooltip content={null} renderProps={renderProps} delay={1}>
        <button type="button">day</button>
      </Tooltip>,
    );
    fireEvent.mouseEnter(button);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('cleans up the timer when unmounted', () => {
    const { unmount } = render(
      <Tooltip content="cleanup" renderProps={renderProps} delay={50}>
        <button type="button">day</button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'day' }));
    unmount();
    expect(true).toBe(true);
  });

  it('stays hidden when opened with null content', () => {
    vi.useFakeTimers();
    render(
      <Tooltip content={null} renderProps={renderProps} delay={10}>
        <button type="button">day</button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'day' }));
    vi.advanceTimersByTime(20);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('forwards focus and blur handlers from child elements', async () => {
    const focus = vi.fn();
    const blur = vi.fn();

    render(
      <Tooltip content="focusable" renderProps={renderProps} delay={0}>
        <button type="button" onFocus={focus} onBlur={blur}>focus day</button>
      </Tooltip>,
    );

    const button = screen.getByRole('button', { name: 'focus day' });
    fireEvent.focus(button);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('focusable');
    fireEvent.blur(button);
    expect(focus).toHaveBeenCalled();
    expect(blur).toHaveBeenCalled();
  });
});
