
import InternalPageLayout from '@/components/InternalPageLayout';

export default function ProcessesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <InternalPageLayout>
            {children}
        </InternalPageLayout>
    );
}