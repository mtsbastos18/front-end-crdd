// src/app/dispatchers/edit/[id]/page.tsx
import DispatcherFormWrapper from "./DispatcherFormWrapper";

export default function EditDispatcherPage({ params }: any) {
    return <DispatcherFormWrapper id={params.id} />;
}
