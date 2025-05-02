import { Button, Modal, Title } from 'src/components';

export function WelcomeModal({ onClick }: { onClick: () => void }) {
  return (
    <Modal>
      <div className="text-center">
        <Title>Welcome to Bat hunter 🦇 🔫</Title>
        <br />
        <br />
        <Button onClick={onClick}>Free Play</Button>
      </div>
    </Modal>
  );
}
