import 'dotenv/config';

import { app } from './app';
import { logger } from './shared/Util/configLogger';
import { env } from './shared/Util/variaveisAmbiente/VariaveisAmbiente';

const { PORT } = env;

app.listen(PORT, () => logger.info(`Server running on port: ${PORT}`));
