import { Table } from '@mantine/core'

function DocTable({ files }) {
    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>File Name</Table.Th>
                    <Table.Th>System</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th colSpan={2}>Actions</Table.Th>
                </Table.Tr>
                <Table.Tbody>
                    {files.map(f => (
                        <Table.Tr key={f.name}>
                            <Table.Td>{f.name}</Table.Td>
                            <Table.Td>{f.system}</Table.Td>
                            <Table.Td>{f.description}</Table.Td>
                            <Table.Td>Preview</Table.Td>
                            <Table.Td>Download</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table.Thead>
        </Table>
    )
}

export default DocTable;