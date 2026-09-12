import React, { useState, type ReactElement } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  FloatingArrow,
  FloatingPortal,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  type Placement,
} from '@floating-ui/react';
import type { TooltipContent, TooltipRenderProps, DatePickerStyles, DatePickerClassNames } from '../../types';
import { cx } from '../../../../shared/utils/cx';

type AnyProps = Record<string, unknown>;

interface TooltipProps {
  content: TooltipContent;
  renderProps: TooltipRenderProps;
  delay?: number;
  placement?: Placement;
  classNames?: DatePickerClassNames;
  styles?: DatePickerStyles;
  children: ReactElement<AnyProps>;
}

export function Tooltip({
  content,
  renderProps,
  delay = 300,
  placement = 'top',
  classNames = {},
  styles: slotStyles = {},
  children,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [arrowElement, setArrowElement] = useState<SVGSVGElement | null>(null);

  const resolvedContent =
    typeof content === 'function' ? content(renderProps) : content;
  const hasContent = resolvedContent != null;

  // Anchored via Floating UI and rendered through a portal so the tooltip can
  // never be clipped by a calendar day's `overflow: hidden` or a popover's
  // stacking context, and always escapes the days grid layout.
  // `transform: false` positions via left/top instead of a CSS transform, so
  // it doesn't fight with the entrance animation's own `transform`.
  const { refs, floatingStyles, context } = useFloating({
    open: open && hasContent,
    onOpenChange: setOpen,
    placement,
    strategy: 'fixed',
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      arrow({ element: arrowElement }),
    ],
  });

  const hover = useHover(context, { move: false, delay: { open: delay, close: 0 } });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  const childRef = (children as unknown as { ref?: React.Ref<unknown> }).ref;
  const mergedRef = useMergeRefs([refs.setReference, childRef ?? null]);

  const child = React.cloneElement(
    children,
    getReferenceProps({ ...children.props, ref: mergedRef }) as AnyProps,
  );

  // Theme CSS variables (--fldp-*) are scoped to the `.fldp-root` wrapper, not
  // `:root`, so the tooltip must portal inside it — portaling to
  // `document.body` (the default) would leave it unstyled/invisible.
  // `undefined` (not `null`) falls back to the default body portal when no
  // `.fldp-root` ancestor is found (e.g. in isolated unit tests).
  const anchorEl = refs.reference.current;
  const portalRoot =
    (anchorEl instanceof HTMLElement ? anchorEl.closest<HTMLElement>('.fldp-root') : null) ??
    undefined;

  return (
    <>
      {child}
      {open && hasContent && (
        <FloatingPortal root={portalRoot}>
          <div
            ref={refs.setFloating}
            className={cx('fldp-tooltip', classNames.tooltip)}
            style={{ ...floatingStyles, ...slotStyles.tooltip }}
            {...getFloatingProps()}
          >
            {resolvedContent}
            <FloatingArrow
              ref={setArrowElement}
              context={context}
              style={{ fill: 'var(--fldp-foreground)' }}
              width={10}
              height={5}
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
}

