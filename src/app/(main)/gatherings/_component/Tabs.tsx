import Tab from '@/app/components/Tab/Tab';

interface TabsProps {
  activeTab: 'dalaemfit' | 'workation';
  onTabClick: (type: 'dalaemfit' | 'workation') => void;
}

const Tabs = ({ activeTab, onTabClick }: TabsProps) => {
  return (
    <div className='flex space-x-12'>
      <Tab
        type='dalaemfit'
        isActive={activeTab === 'dalaemfit'}
        onClick={() => onTabClick('dalaemfit')}
      />
      <Tab
        type='workation'
        isActive={activeTab === 'workation'}
        onClick={() => onTabClick('workation')}
      />
    </div>
  );
};

export default Tabs;
