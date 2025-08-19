// src/app/dispatchers/edit/[id]/page.tsx
import DispatcherFormWrapper from "./DispatcherFormWrapper";

export default async function EditDispatcherPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <DispatcherFormWrapper id={id} />;
}
