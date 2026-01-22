import { useNavigate } from 'react-router';
import { SignInButton } from 'src/features/authentication/sign-in-button';
import { Gutter, Modal } from 'src/components';
import { Gap } from 'src/components/gap';

export function SignInModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  const _onClose = () => {
    navigate('/');
    onClose();
  };

  return (
    <Modal
      header="Come and play!"
      className="sign-in-modal"
      open={open}
      onClose={_onClose}
    >
      <Gutter size="xxl">
        <Gap align="center" justify="center">
          <SignInButton onSuccess={() => location.reload()} />
        </Gap>
      </Gutter>
    </Modal>
  );
}
