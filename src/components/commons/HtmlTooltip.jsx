import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/system';

const HtmlTooltip = styled(Tooltip)(({theme}) => ({
  tooltip: {
    backgroundColor: 'transparent',
    maxWidth: theme.spacing(200),
    padding: 0,
    fontSize: theme.typography.pxToRem(12),
  },
}));

export default HtmlTooltip;
