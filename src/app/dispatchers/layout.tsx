import InternalPageLayout from '@/components/InternalPageLayout';
import { ReactNode } from 'react';

export default function DispatchersLayout({ children }: { children: ReactNode }) {
    return (
        <InternalPageLayout>
            {children}
        </InternalPageLayout>
    );
}