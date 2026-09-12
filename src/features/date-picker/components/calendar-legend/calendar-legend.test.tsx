import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CalendarLegend } from './calendar-legend';

describe('CalendarLegend', () => {
  it('renders default legend items', () => {
    render(<CalendarLegend />);
    
    expect(screen.getByText('Dates Sélectionnées')).toBeInTheDocument();
    expect(screen.getByText('Disponibilité')).toBeInTheDocument();
    expect(screen.getByText('Pas De Disponibilité')).toBeInTheDocument();
    expect(screen.getByText('Séjour Minimal')).toBeInTheDocument();
    expect(screen.getByText("Pas D'Arrivée")).toBeInTheDocument();
  });

  it('renders custom legend items', () => {
    const customItems = [
      { label: 'Custom 1', className: 'custom-class-1' },
      { label: 'Custom 2', className: 'custom-class-2' },
    ];

    render(<CalendarLegend items={customItems} />);
    
    expect(screen.getByText('Custom 1')).toBeInTheDocument();
    expect(screen.getByText('Custom 2')).toBeInTheDocument();
    expect(screen.queryByText('Dates Sélectionnées')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<CalendarLegend className="custom-legend" />);
    
    const legend = container.querySelector('.fldp-calendar-legend');
    expect(legend).toHaveClass('custom-legend');
  });

  it('applies custom style', () => {
    const customStyle = { padding: '20px', marginTop: '10px' };
    const { container } = render(<CalendarLegend style={customStyle} />);
    
    const legend = container.querySelector('.fldp-calendar-legend');
    expect(legend).toHaveStyle({ padding: '20px', marginTop: '10px' });
  });

  it('renders the correct number of legend boxes', () => {
    const { container } = render(<CalendarLegend />);
    
    const legendBoxes = container.querySelectorAll('.fldp-legend-box');
    expect(legendBoxes).toHaveLength(5);
  });

  it('applies correct CSS classes to legend boxes', () => {
    const { container } = render(<CalendarLegend />);
    
    const legendBoxes = container.querySelectorAll('.fldp-legend-box');
    expect(legendBoxes[0]).toHaveClass('fldp-legend-box--selected');
    expect(legendBoxes[1]).toHaveClass('fldp-legend-box--available');
    expect(legendBoxes[2]).toHaveClass('fldp-legend-box--unavailable');
    expect(legendBoxes[3]).toHaveClass('fldp-legend-box--minimal-stay');
    expect(legendBoxes[4]).toHaveClass('fldp-legend-box--no-arrival');
  });

  it('renders ReactNode labels', () => {
    const customItems = [
      { 
        label: <span data-testid="custom-label">Custom <strong>Bold</strong> Label</span>, 
        className: 'custom-class' 
      },
    ];

    render(<CalendarLegend items={customItems} />);
    
    expect(screen.getByTestId('custom-label')).toBeInTheDocument();
    expect(screen.getByText('Bold')).toBeInTheDocument();
  });
});
