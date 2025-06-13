import React, { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { SelectList, type SelectListOption } from './index.js';
// import styles from './select-list.module.scss'; // Not directly used in compositions, but available

// --- Icon Components (simple SVGs for demonstration) ---
const CategoryIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4H4c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
  </svg>
);

const TagIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
  </svg>
);

const RocketIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.24 14.24l-2.47-2.47C13.39 11.39 13 10.7 13 10c0-1.66 1.34-3 3-3s3 1.34 3 3c0 .7-.39 1.39-.76 1.76l2.47 2.47c.78.78.78 2.05 0 2.83s-2.05.78-2.83 0zM9.5 15c-2.49 0-4.5-2.01-4.5-4.5S7.01 6 9.5 6s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-7C8.12 8 7 9.12 7 10.5S8.12 13 9.5 13s2.5-1.12 2.5-2.5S10.88 8 9.5 8zM4 20h10c1.1 0 2-.9 2-2v-1.5c0-.83-.67-1.5-1.5-1.5S13 15.67 13 16.5V18H4v2z" />
  </svg>
);

// --- Sample Data ---
const productCategories: SelectListOption[] = [
  { value: 'ai-tools', label: 'AI Tools', icon: CategoryIcon },
  { value: 'developer-tools', label: 'Developer Tools', icon: CategoryIcon },
  { value: 'productivity', label: 'Productivity Apps', icon: CategoryIcon },
  { value: 'marketing-tech', label: 'Marketing Tech', icon: CategoryIcon, disabled: true },
  { value: 'design-resources', label: 'Design Resources', icon: CategoryIcon },
  { value: 'no-code', label: 'No-Code Platforms', icon: CategoryIcon },
];

const productTags: SelectListOption[] = [
  { value: 'saas', label: 'SaaS', icon: TagIcon },
  { value: 'opensource', label: 'Open Source', icon: TagIcon },
  { value: 'api', label: 'API', icon: TagIcon },
  { value: 'mobile', label: 'Mobile App', icon: TagIcon, disabled: true },
  { value: 'desktop', label: 'Desktop App', icon: TagIcon },
  { value: 'extension', label: 'Browser Extension', icon: TagIcon },
];

const upcomingLaunches: SelectListOption[] = [
  { value: 'launch-alpha', label: 'Project Alpha Launch', date: '2024-08-15', type: 'New Product' },
  { value: 'launch-beta', label: 'Service Beta Release', date: '2024-09-01', type: 'Update' },
  { value: 'launch-gamma', label: 'Platform Gamma Access', date: '2024-09-20', type: 'Early Access', disabled: true },
  { value: 'launch-delta', label: 'Tool Delta Debut', date: '2024-10-05', type: 'New Feature' },
];


// --- Compositions ---

export const SingleSelectProductCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  return (
    <MemoryRouter>
      <InfinityTheme>
        <div style={{ padding: '20px', maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-medium)', backgroundColor: 'var(--colors-surface-background)' }}>
          <h3 style={{fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', margin: '0 0 var(--spacing-small) 0'}}>Select Product Category</h3>
          <SelectList
            id="productCategory"
            options={productCategories}
            value={selectedCategory}
            onChange={(val) => setSelectedCategory(val as string)}
            placeholder="Choose a category..."
            label="Category"
          />
          <p style={{fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)'}}>
            Selected: {selectedCategory || 'None'}
          </p>
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const MultipleSelectProductTags = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['saas']);

  return (
    <MemoryRouter>
      <InfinityTheme>
        <div style={{ padding: '20px', maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-medium)', backgroundColor: 'var(--colors-surface-background)' }}>
          <h3 style={{fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', margin: '0 0 var(--spacing-small) 0'}}>Select Product Tags</h3>
          <SelectList
            id="productTags"
            options={productTags}
            value={selectedTags}
            onChange={(val) => setSelectedTags(val as string[])}
            multiple
            placeholder="Select tags..."
            label="Tags (Multiple)"
          />
           <p style={{fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)'}}>
            Selected: {selectedTags.join(', ') || 'None'}
          </p>
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const CustomRenderUpcomingLaunches = () => {
  const [selectedLaunch, setSelectedLaunch] = useState<string | undefined>('launch-beta');

  const renderLaunchOption = (option: SelectListOption, isSelected: boolean, isHighlighted: boolean) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-small)', width: '100%' }}>
      <RocketIcon style={{ fontSize: 'var(--sizes-icon-medium)', color: isSelected || isHighlighted ? 'var(--colors-text-inverse)' : 'var(--colors-primary-default)' }} />
      <div style={{ flexGrow: 1 }}>
        <div style={{ fontWeight: 'var(--typography-font-weight-medium)' }}>{option.label}</div>
        <div style={{ fontSize: 'var(--typography-sizes-body-x-small)', opacity: 0.8 }}>
          {option.type} - {option.date}
        </div>
      </div>
    </div>
  );

  const renderSelectedLaunch = (
    selectedValue: string | string[] | undefined,
    options: SelectListOption[],
    placeholder?: string
  ) => {
    if (!selectedValue || (Array.isArray(selectedValue) && selectedValue.length === 0)) {
      return <span style={{color: 'var(--colors-text-secondary)', fontStyle: 'italic'}}>{placeholder}</span>;
    }
    const selectedOption = options.find(opt => opt.value === selectedValue);
    if (!selectedOption) return placeholder;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-small)' }}>
        <RocketIcon style={{ fontSize: 'var(--sizes-icon-small)', color: 'var(--colors-primary-default)' }} />
        <span>{selectedOption.label} ({selectedOption.type})</span>
      </div>
    );
  };

  return (
    <MemoryRouter>
      <InfinityTheme>
        <div style={{ padding: '20px', maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-medium)', backgroundColor: 'var(--colors-surface-background)' }}>
          <h3 style={{fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', margin: '0 0 var(--spacing-small) 0'}}>Upcoming Launches (Custom Render)</h3>
          <SelectList
            id="upcomingLaunches"
            options={upcomingLaunches}
            value={selectedLaunch}
            onChange={(val) => setSelectedLaunch(val as string)}
            placeholder="Select a launch..."
            label="Featured Launch"
            renderOption={renderLaunchOption}
            renderSelectedValue={renderSelectedLaunch}
            dropdownMaxHeight="200px"
          />
          <p style={{fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)'}}>
            Current Selection: {selectedLaunch ? upcomingLaunches.find(l => l.value === selectedLaunch)?.label : 'None'}
          </p>
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const DisabledSelectList = () => {
  return (
    <MemoryRouter>
      <InfinityTheme>
        <div style={{ padding: '20px', maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-medium)', backgroundColor: 'var(--colors-surface-background)' }}>
          <h3 style={{fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', margin: '0 0 var(--spacing-small) 0'}}>Disabled Select List</h3>
          <SelectList
            id="disabledList"
            options={productCategories}
            value="productivity"
            onChange={() => { /* This won't be called */ }}
            placeholder="Cannot select"
            label="System Status (Disabled)"
            disabled
          />
          <p style={{fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)'}}>
            This select list is disabled and cannot be interacted with.
          </p>
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};