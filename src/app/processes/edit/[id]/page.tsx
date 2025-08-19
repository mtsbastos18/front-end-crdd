import ProcessFormWrapper from './ProcessFormWrapper';

export default async function EditProcessPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ProcessFormWrapper id={id} />
}